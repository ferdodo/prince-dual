import { Connection, Message } from "connection-types";
import { Observable, Subject } from "rxjs";

function * idGenerator(): Iterator<number> {
	while(true) {
		for(let id = 1; id < 99999999; id++) {
			yield id;
		}
	}
}

const idIterator = idGenerator();
const serverConnexions$ = new Subject<Connection>();
let serverStarted = false;

export function startServer(): Observable<Connection> {
	if (!serverStarted) {
		throw new Error("Server is already started !");
	}

	serverStarted = true;
	return serverConnexions$.asObservable();
}

export function createConnexion(): Connection {
	if (!serverStarted) {
		throw new Error("Failed to connect to server !");
	}

	const messagesToServer$ = new Subject<Message>();
	const messagesToClient$ = new Subject<Message>();

	const serverConnexion = {
		id: idIterator.next().value,
		messages$: messagesToServer$.asObservable(),
		async send(message: Message) {
			messagesToClient$.next(message);
		}
	}

	const clientConnexion = {
		id: idIterator.next().value,
		messages$: messagesToClient$.asObservable(),
		async send(message: Message) {
			messagesToServer$.next(message);
		}
	};

	serverConnexions$.next(serverConnexion);
	return clientConnexion;
}
