import { messages$ } from "ws-client";
import { filterMessage } from "./model";
import { MyPlayer } from "player";
import { Observable, filter } from "rxjs";

export function observeMyPlayer(): Observable<MyPlayer> {
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
