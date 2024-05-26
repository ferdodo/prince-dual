export interface SignalingEvent {
	offer?: RTCSessionDescriptionInit;
	answer?: RTCSessionDescriptionInit;
	candidate?: RTCIceCandidateInit;
	clearCandidate?: boolean;
}
