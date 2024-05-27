import type { Game, Message, ObserveGameBroadcast } from "core";
import { Observable, filter, map } from "rxjs";
import type { Connection } from "connection-types";

export function observeGame(connection: Connection<Message>): Observable<Game> {
	return new Observable(function (subscriber) {
		const subscription = connection.messages$
			.pipe(
				map((m) => m.observeGameBroadcast),
				filter(Boolean),
			)
			.subscribe({
				next(broadcast: ObserveGameBroadcast) {
					subscriber.next(broadcast.game);
				},
				complete() {
					subscription.unsubscribe();
				},
			});
	});
}
