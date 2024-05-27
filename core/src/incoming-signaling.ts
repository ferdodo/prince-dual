import { Subject } from "rxjs";
import type { SignalingEvent } from "core";

const _incomingSignaling$: Subject<SignalingEvent[]> = new Subject();

export const incomingSignaling$ = _incomingSignaling$.asObservable();

export function broadcastIncomingSignaling(event: SignalingEvent[]) {
    _incomingSignaling$.next(event);
}

