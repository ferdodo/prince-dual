import { Connection } from "link";
import { filterMessage, GetGameResponse } from "./model";
import { Observable, filter, Subscription } from "rxjs";
import { readGame } from "game/node";

export function getGame(connexions$: Observable<Connection>): Subscription {
	return connexions$.subscribe(function(connection: Connection) {
		const subscription = connection.messages$.pipe(filter(filterMessage))
			.subscribe({
				next() {
					connection.send(<GetGameResponse> {
						eventType: "GET_GAME",
						content: readGame()
					});
				},
				complete() {
					subscription.unsubscribe();
				}
			});
	});
}
