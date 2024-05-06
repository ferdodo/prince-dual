import { Connection } from "connection-types";
import { Observable, Subject, share, filter } from "rxjs";
import { SignalingEvent, broadcastSignalToOtherTabs, signalIncomingFromOtherTabs$ } from "./signaling";

export function createRtcConnection<T>(): [() => Connection<T>, Observable<Connection<T>>] {
	const broadcastToServer$ = new Subject<T>();
	const broadcastToCurrentTabFromServer$ = new Subject<T>();
	const broadcastToWebRTC$ = new Subject<T>();
	const broadcastFromWebRTC$ = new Subject<T>();
	const _offlineServer$ = new Subject<Connection<T>>();
	const waitServerPrepare = new Promise(r => setTimeout(r, 150));
	let tabIsServer = false;
	let acceptedAnswer = false;

	const currentTabServerConnection: Connection<T> = {
		id: 1,
		messages$: broadcastToServer$.asObservable(),
		send(message: T) {
			broadcastToCurrentTabFromServer$.next(message);
		}
	};

	const peerServerConnection: Connection<T> = {
		id: 2,
		messages$: broadcastFromWebRTC$.asObservable(),
		send(message: T) {
			broadcastToWebRTC$.next(message);
		}
	};

	const peerConnection: RTCPeerConnection = new RTCPeerConnection();
	let iceCandidateSent = false;
	let clearCandidateSent = false;

	peerConnection.onicecandidate = function(e: RTCPeerConnectionIceEvent) {
		const { candidate } = e;

		if (candidate && !iceCandidateSent) {
			iceCandidateSent = false;

			broadcastSignalToOtherTabs({
				candidate: candidate.toJSON()
			});
		} else if (clearCandidateSent) {
			clearCandidateSent = false;
			broadcastSignalToOtherTabs({ clearCandidate: true });
		}
	};

	const signalingSubscription = signalIncomingFromOtherTabs$
		.subscribe({
			next(signalingEvent: SignalingEvent) {
				if (signalingEvent.offer) {
					handleOffer(peerConnection, signalingEvent.offer)
						.then(() => acceptedAnswer = false)
						.catch(console.error);
				}

				if (signalingEvent.answer) {
					handleAnswer(peerConnection, signalingEvent.answer)
						.then(() => acceptedAnswer = true)
						.catch(console.error);
				}

				if (signalingEvent.candidate) {
					handleCandidate(peerConnection, signalingEvent.candidate)
						.catch(console.error);
				}

				if (signalingEvent.clearCandidate) {
					handleClearCandidate(peerConnection)
						.catch(console.error);
				}
			},
			error(error) {
				console.error(error);
			}
		});

	async function sendOffers() {
		const offer = await peerConnection.createOffer();
		await peerConnection.setLocalDescription(offer);
		broadcastSignalToOtherTabs({ offer });
	}

	sendOffers()
		.catch(console.error);

	peerConnection.ondatachannel = function receiveChannelCallback(event: RTCDataChannelEvent) {
		event.channel.onmessage = function(event: MessageEvent<string>) {
			const message: T = JSON.parse(event.data);
			broadcastFromWebRTC$.next(message);
		}
	};

	peerConnection.addEventListener("connectionstatechange", function() {	
		switch(peerConnection.connectionState) {
			case "connecting":
				break;
			case "connected":
				tabIsServer = acceptedAnswer;
			
				if (tabIsServer) {
					_offlineServer$.next(currentTabServerConnection);
					_offlineServer$.next(peerServerConnection);
				}
			
				break;
			case "closed":
			case "disconnected":
			case "failed":
				signalingSubscription.unsubscribe();
				_offlineServer$.complete();
				break;
			default:
				throw new Error("Unhandled state change !");
		}
	});

	const sendChannel = peerConnection.createDataChannel('sendDataChannel');

	async function sendWhenConnected(m: T) {
		while (peerConnection.connectionState !== "connected") {
			await new Promise(r => setTimeout(r, 50));
		}

		await waitServerPrepare;
		sendChannel.send(JSON.stringify(m));
	}

	const subscriptionToSendToWebRTC = broadcastToWebRTC$.subscribe({
		next: sendWhenConnected,
		error(error) {
			console.error(error);
		}
	});

    function createClientConnection() {
        return {
            id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
            messages$: new Observable<T>(function(subscriber) {
    
                const connMessagesSub1 = broadcastToCurrentTabFromServer$
                    .pipe(filter(() => tabIsServer))
                    .subscribe({
                        next(message) {
                            subscriber.next(message);
                        },
                        error(error) {
                            console.error(error);
                        }
                    });
    
    
                const connMessagesSub2 = broadcastFromWebRTC$
                    .pipe(filter(() => !tabIsServer))
                    .subscribe({
                        next(message) {
                            subscriber.next(message);
                        },
                        error(error) {
                            console.error(error);
                        }
                    });
    
                peerConnection.addEventListener("connectionstatechange", function() {
                    switch(peerConnection.connectionState) {
                        case "connecting":
                        case "connected":
                            break;
                        case "closed":
                        case "disconnected":
                        case "failed":
                            connMessagesSub1.unsubscribe();
                            connMessagesSub2.unsubscribe();
                            subscriptionToSendToWebRTC.unsubscribe();
                            subscriber.complete();
                            break;
                        default:
                            throw new Error("Unhandled state !");
                    }
    
                });
            })
                .pipe(share()),
            send(message: T) {
                if (tabIsServer) {
                    broadcastToServer$.next(message);
                } else {
                    sendWhenConnected(message)
                        .catch(console.error);
                }
            }
        }
    }

	return [
		createClientConnection,
		_offlineServer$.asObservable()
	];
}

async function handleOffer(peerConnection: RTCPeerConnection, offer: RTCSessionDescriptionInit) {
	await peerConnection.setRemoteDescription(offer);
	const answer = await peerConnection.createAnswer();
	broadcastSignalToOtherTabs({ answer });
	await peerConnection.setLocalDescription(answer);
}

async function handleAnswer(peerConnection: RTCPeerConnection, answer: RTCSessionDescriptionInit) {
  await peerConnection.setRemoteDescription(answer);
}

async function handleCandidate(peerConnection: RTCPeerConnection, candidate: RTCIceCandidateInit) {
    await peerConnection.addIceCandidate(candidate);
}

async function handleClearCandidate(peerConnection: RTCPeerConnection) {
    await peerConnection.addIceCandidate();
}
