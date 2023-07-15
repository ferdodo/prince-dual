import { WebSocketServer } from "ws";
import { Observable, share } from "rxjs";
import { Connection, Message } from "link";

function * idGenerator(): Iterator<number> {
	while(true) {
		for(let id = 1; id < 99999999; id++) {
			yield id;
		}
	}
}

export function startServer(): Observable<Connection> {
	return new Observable<Connection>(function(connexionSubscriber) {
		const wss = new WebSocketServer({ port: 3000, path: "/ws" });
		const idIterator = idGenerator();

		wss.on('connection', function connection(ws) {
			const messages$ = new Observable<Message>(function(messageSubscriber) {
				ws.on('message', function message(data) {
					const parsed = JSON.parse(data);
					messageSubscriber.next(parsed);
				});

				ws.on('close', function() {
					messageSubscriber.complete();
				});
			})

			const send = function(payload: Message) {
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
