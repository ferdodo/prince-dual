import { Observable, share } from "rxjs";
import { Connection } from "connection-types";

function * idGenerator(): Iterator<number> {
	while(true) {
		for(let id = 1; id < 99999999; id++) {
			yield id;
		}
	}
}

const idIterator = idGenerator();

export function createConnexion<T>(wsProtocol: string, wsPort: number, webDomain: string): Connection<T> {
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

	const messages$ = new Observable<T>(function(subscriber) {
		socket.onmessage = function(event) {
			const deserialized: T = JSON.parse(event.data);
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
		keepAliveInteval = setInterval(() => socket.send("KEEP_ALIVE"), 25000);
		return waitDisconnected;
	})
		.finally(() => clearInterval(keepAliveInteval));

	return {
		id: idIterator.next().value,
		messages$,
		async send(message: T) {
			await waitConnected;
			const serialized = JSON.stringify(message);
			socket.send(serialized);
		}
	}
}
