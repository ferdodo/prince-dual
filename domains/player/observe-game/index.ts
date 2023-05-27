import { messages$ } from "client";
import { filterMessage } from "./model";
import { Game } from "game";
import { Observable, filter } from "rxjs";

export function observeGame(): Observable<Game> {
	return new Observable(function(subscriber) {
		const subscription = messages$.pipe(filter(filterMessage))
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
