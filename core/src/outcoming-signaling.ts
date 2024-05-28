import { Subject } from "rxjs";
import type { SignalingEvent } from "core/types";

const _outcomingSignaling$: Subject<SignalingEvent> = new Subject();

export const outcomingSignaling$ = _outcomingSignaling$.asObservable();

export function broadcastOutcomingSignaling(event: SignalingEvent) {
    _outcomingSignaling$.next(event);
}


