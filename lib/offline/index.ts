import { Connection, Message } from "connection-types";
import { Observable, Subject, BehaviorSubject, share, filter } from "rxjs";
import { idIterator } from "./id-iterator";
import { SignalingEvent, broadcastSignalToOtherTabs, signalIncomingFromOtherTabs$ } from "./signaling";

export enum ConnectionState {
	NotConnected = "⌛ Not connected",
	Connected = "✅ Connected",
	Disconnected = "❌ Disconnected"
}

const closeCurrentConnection$ = new Subject<void>();

const _connectionState$ = new BehaviorSubject<ConnectionState>(ConnectionState.NotConnected);
let acceptedAnswer = false;

export function getConnectionState(): ConnectionState {
	return _connectionState$.getValue();
}

export const connectionState$: Observable<ConnectionState> = _connectionState$.asObservable();

const _tabIsServer$ = new BehaviorSubject(false);

export function isTabServer(): boolean {
	return _tabIsServer$.getValue();
}

export const tabIsServer$: Observable<boolean> = _tabIsServer$.asObservable();

const broadcastToServer$ = new Subject<Message>();
const broadcastToCurrentTabFromServer$ = new Subject<Message>();
const broadcastToWebRTC$ = new Subject<Message>();
const broadcastFromWebRTC$ = new Subject<Message>();

const currentTabServerConnection: Connection = {
	id: 1,
	messages$: broadcastToServer$.asObservable(),
	send(message: Message) {
		broadcastToCurrentTabFromServer$.next(message);
	}
};

const peerServerConnection: Connection = {
	id: 2,
	messages$: broadcastFromWebRTC$.asObservable(),
	send(message: Message) {
		broadcastToWebRTC$.next(message);
	}
};

const _offlineServer$ = new Subject<Connection>();
export const offlineServer$ = _offlineServer$.asObservable();

export function startOfflineServer() {
	_offlineServer$.next(currentTabServerConnection);
	_offlineServer$.next(peerServerConnection);
}

const _connection$ = new BehaviorSubject(createRtcConnection());

export function getConnection(): Connection {
	return _connection$.getValue();
}

export const connection$: Observable<Connection> = _connection$.asObservable();

export function resetConnection() {
	closeCurrentConnection$.next();

	setTimeout(function() {
		_connection$.next(createRtcConnection());
	}, 100);
}

const waitServerPrepare = new Promise(r => setTimeout(r, 150));

function createRtcConnection(): Connection {
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

	_connectionState$.next(ConnectionState.NotConnected);

	const signalingSubscription = signalIncomingFromOtherTabs$
		.subscribe({
			next(signalingEvent: SignalingEvent) {
				const connectionState = getConnectionState();

				if (signalingEvent.offer && connectionState === ConnectionState.NotConnected) {
					handleOffer(peerConnection, signalingEvent.offer)
						.catch(console.error);
				}

				if (signalingEvent.answer && connectionState === ConnectionState.NotConnected) {
					handleAnswer(peerConnection, signalingEvent.answer)
						.catch(console.error);
				}

				if (signalingEvent.candidate && connectionState === ConnectionState.NotConnected) {
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
		const _connectionState = getConnectionState();

		if (_connectionState === ConnectionState.NotConnected) {
			const offer = await peerConnection.createOffer();
			await peerConnection.setLocalDescription(offer);
			broadcastSignalToOtherTabs({ offer });
		}
	}

	sendOffers()
		.catch(console.error);

	peerConnection.ondatachannel = function receiveChannelCallback(event: RTCDataChannelEvent) {
		event.channel.onmessage = function(event: MessageEvent<string>) {
			const message: Message = JSON.parse(event.data);
			broadcastFromWebRTC$.next(message);
		}
	};

	const closeConnectionSub = closeCurrentConnection$.subscribe({
		next() {
			peerConnection.close();
		},
		error(error) {
			console.error(error);
		}
	});

	peerConnection.addEventListener("connectionstatechange", function() {	
		switch(peerConnection.connectionState) {
			case "connecting":
				_connectionState$.next(ConnectionState.NotConnected);
				_tabIsServer$.next(false);
				break;
			case "connected":
				_connectionState$.next(ConnectionState.Connected);
				_tabIsServer$.next(acceptedAnswer);
				break;
			case "closed":
			case "disconnected":
			case "failed":
				_connectionState$.next(ConnectionState.Disconnected);
				_tabIsServer$.next(false);
				signalingSubscription.unsubscribe();
				closeConnectionSub.unsubscribe();
				break;
			default:
				throw new Error("Unhandled state change !");
		}
	});

	const sendChannel = peerConnection.createDataChannel('sendDataChannel');

	async function sendWhenConnected(m: Message) {
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

	return {
		id: idIterator.next().value,
		messages$: new Observable<Message>(function(subscriber) {

			const connMessagesSub1 = broadcastToCurrentTabFromServer$
				.pipe(filter(() => isTabServer()))
				.subscribe({
					next(message) {
						subscriber.next(message);
					},
					error(error) {
						console.error(error);
					}
				});


			const connMessagesSub2 = broadcastFromWebRTC$
				.pipe(filter(() => !isTabServer()))
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
		send(message: Message) {
			const tabIsServer = isTabServer();

			if (tabIsServer) {
				broadcastToServer$.next(message);
			} else {
				sendWhenConnected(message)
					.catch(console.error);
			}
		}
	}
}

async function handleOffer(peerConnection: RTCPeerConnection, offer: RTCSessionDescriptionInit) {
	await peerConnection.setRemoteDescription(offer);
	const answer = await peerConnection.createAnswer();
	broadcastSignalToOtherTabs({ answer });
	await peerConnection.setLocalDescription(answer);
	acceptedAnswer = false;
}

async function handleAnswer(peerConnection: RTCPeerConnection, answer: RTCSessionDescriptionInit) {
  await peerConnection.setRemoteDescription(answer);
  acceptedAnswer = true;
}

async function handleCandidate(peerConnection: RTCPeerConnection, candidate: RTCIceCandidateInit) {
    await peerConnection.addIceCandidate(candidate);
}

async function handleClearCandidate(peerConnection: RTCPeerConnection) {
    await peerConnection.addIceCandidate();
}
