import { Subject } from "rxjs";
import type { SignalingEvent } from "core";

const _outcomingSignaling$: Subject<SignalingEvent> = new Subject();

export const outcomingSignaling$ = _outcomingSignaling$.asObservable();

export function broadcastOutcomingSignaling(event: SignalingEvent) {
    _outcomingSignaling$.next(event);
}


