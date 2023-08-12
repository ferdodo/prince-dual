import { Game } from "game";
import { Observable, filter, map } from "rxjs";
import { Connection } from "connection-types";
import { Message } from "../message";
import { ObserveGameBroadcast } from "./model";

export function observeGame(connection: Connection<Message>): Observable<Game> {
	return new Observable(function(subscriber) {
		const subscription = connection.messages$.pipe(
			map(m => m.observeGameBroadcast),
			filter(Boolean)
		)
			.subscribe({
				next(broadcast: ObserveGameBroadcast) {
					subscriber.next(broadcast.game);
				},
				complete() {
					subscription.unsubscribe();
				}
			});
	});
}
