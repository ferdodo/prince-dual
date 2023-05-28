import { filterMessage } from "./model";
import { Game } from "game";
import { Observable, filter } from "rxjs";
import { Connexion } from "link";

export function observeGame(connexion: Connexion): Observable<Game> {
	return new Observable(function(subscriber) {
		const subscription = connexion.messages$.pipe(filter(filterMessage))
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
