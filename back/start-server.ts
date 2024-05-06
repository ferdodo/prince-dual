import { WebSocketServer } from "ws";
import { Observable, share } from "rxjs";
import { Connection } from "connection-types";

export function startServer<T>(): Observable<Connection<T>> {
	return new Observable<Connection<T>>(function(connexionSubscriber) {
		const wss = new WebSocketServer({ port: 3000, path: "/ws" });

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

			const id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);

			connexionSubscriber.next({
				messages$,
				send,
				id
			});
		});
	})
		.pipe(share());
}
