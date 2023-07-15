import { filterMessage } from "./model";
import { Game } from "game";
import { Observable, filter } from "rxjs";
import { Connection } from "link";

export function observeGame(connection: Connection): Observable<Game> {
	return new Observable(function(subscriber) {
		const subscription = connection.messages$.pipe(filter(filterMessage))
			.subscribe({
				next(message) {
					subscriber.next(message.content);
				},
				complete() {
					subscription.unsubscribe();
				}
			});
	});
}
