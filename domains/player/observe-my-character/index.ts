import { messages$ } from "client";
import { filterMessage } from "./model";
import { Character } from "character";
import { Observable, filter } from "rxjs";

export function observeMyCharacter(): Observable<Character> {
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
