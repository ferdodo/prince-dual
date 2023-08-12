import { WebSocketServer } from "ws";
import { Observable, share } from "rxjs";
import { Connection } from "connection-types";

function * idGenerator(): Iterator<number> {
	while(true) {
		for(let id = 1; id < 99999999; id++) {
			yield id;
		}
	}
}

export function startServer<T>(): Observable<Connection<T>> {
	return new Observable<Connection<T>>(function(connexionSubscriber) {
		const wss = new WebSocketServer({ port: 3000, path: "/ws" });
		const idIterator = idGenerator();

		wss.on('connection', function connection(ws) {
			const messages$ = new Observable<T>(function(messageSubscriber) {
				ws.on('message', function message(data) {
					if (data == "KEEP_ALIVE") {
						return;
					}

					const parsed = JSON.parse(data);
					messageSubscriber.next(parsed);
				});

				ws.on('close', function() {
					messageSubscriber.complete();
				});
			})

			const send = function(payload: T) {
				const serialized = JSON.stringify(payload);
				ws.send(serialized);
			};

			const id = idIterator.next().value;

			connexionSubscriber.next({
				messages$,
				send,
				id
			});
		});
	})
		.pipe(share());
}
