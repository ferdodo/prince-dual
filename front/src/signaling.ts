import { Observable, Subject } from "rxjs";
import { SignalingEvent } from "core";

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
