import { Message } from "core";
import { Subject } from "rxjs";
import { Connection } from "connection-types";

export function createBidirectionalConnectionMock() {
    const _clientMessage$: Subject<Message> = new Subject();
    const _serverMessage$: Subject<Message> = new Subject();

    const clientConnection: Connection<Message> = {
        id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
        messages$: _clientMessage$.asObservable(),
        send(message: Message) {
            _serverMessage$.next(message);
        }
    }

    const serverConnection = {
        id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
        messages$: _serverMessage$.asObservable(),
        send(message: Message) {
            _clientMessage$.next(message);
        }
    }
    return [clientConnection, serverConnection];
}
