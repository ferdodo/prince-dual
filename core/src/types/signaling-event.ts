export interface SignalingEvent {
	id?: string;
	offer?: RTCSessionDescriptionInit;
	answer?: RTCSessionDescriptionInit;
	candidate?: RTCIceCandidateInit;
	clearCandidate?: boolean;
}
