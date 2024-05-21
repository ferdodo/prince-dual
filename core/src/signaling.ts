import { Subject } from "rxjs";
import { SignalingEvent } from "core";

const _signaling$: Subject<SignalingEvent> = new Subject();

export const signaling$ = _signaling$.asObservable();

export function broadcastSignaling(event: SignalingEvent) {
    _signaling$.next(event);
}

