import { Observable, Subject } from "rxjs";

export interface SignalingEvent {
	offer?: RTCSessionDescriptionInit,
	answer?: RTCSessionDescriptionInit,
	candidate?: RTCIceCandidateInit,
	clearCandidate?: boolean
}

const signaling = new BroadcastChannel('webrtc');

const signalingMessage$ = new Subject<SignalingEvent>();

signaling.onmessage = function(e: MessageEvent<SignalingEvent>) {
	const data = e?.data;
	signalingMessage$.next(data);
};

export function broadcastSignalToOtherTabs(signal: SignalingEvent) {
	signaling.postMessage(signal);
}

export const signalIncomingFromOtherTabs$: Observable<SignalingEvent> = signalingMessage$.asObservable();
