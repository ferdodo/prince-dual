import { filterMessage } from "./model";
import { Character } from "character";
import { Observable, filter } from "rxjs";
import { Connexion } from "link";

export function observeMyCharacter(connexion: Connexion): Observable<Character> {
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
