import { Observable, share } from "rxjs";
import { Message, Connection } from "connection-types";

function * idGenerator(): Iterator<number> {
	while(true) {
		for(let id = 1; id < 99999999; id++) {
			yield id;
		}
	}
}

const idIterator = idGenerator();

export function createConnexion(wsProtocol: string, wsPort: number, webDomain: string): Connection {
	const showPort = wsProtocol === 'ws' && wsPort != 80
		|| wsProtocol === 'wss' && wsPort != 443;

	const wsUrl = `${ wsProtocol }://${ webDomain }${ showPort ? (":"+wsPort) : "" }/ws`;
	const socket: WebSocket = new WebSocket(wsUrl);

	const waitDisconnected = new Promise(function(resolve) {
		socket.onclose = () => resolve(undefined);
	});

	const waitConnected = new Promise(function(resolve, reject) {
		socket.onopen = () => resolve(undefined);

		waitDisconnected.finally(reject);
	});

	const messages$ = new Observable<Message>(function(subscriber) {
		socket.onmessage = function(event) {
			const deserialized: Message = JSON.parse(event.data);
			subscriber.next(deserialized);
		};

		waitDisconnected.finally(() => subscriber.complete());
	})
		.pipe(share());

	let keepAliveInteval;

	/**
	 * Prevent web servers or reverse proxy automatically close
	 * inactive sockets by keeping it active.
	 */
	waitConnected.then(function() {
		const keepAliveMessage: Message = { messageType: "KEEP_ALIVE" };
		const serialized = JSON.stringify(keepAliveMessage);
		keepAliveInteval = setInterval(() => socket.send(serialized), 25000);
		return waitDisconnected;
	})
		.finally(() => clearInterval(keepAliveInteval));

	return {
		id: idIterator.next().value,
		messages$,
		async send(message: Message) {
			await waitConnected;
			const serialized = JSON.stringify(message);
			socket.send(serialized);
		}
	}
}
