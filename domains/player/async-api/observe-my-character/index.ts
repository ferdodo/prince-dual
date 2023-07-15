import { filterMessage } from "./model";
import { Character } from "character";
import { Observable, filter } from "rxjs";
import { Connection } from "link";

export function observeMyCharacter(connection: Connection): Observable<Character> {
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
