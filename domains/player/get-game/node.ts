import { Connexion } from "ws-server";
import { filterMessage, GetGameResponse } from "./model";
import { Observable, filter, Subscription } from "rxjs";
import { readGame } from "game/node";

export function getGame(connexions$: Observable<Connexion>): Subscription {
	return connexions$.subscribe(function(connexion: Connexion) {
		const subscription = connexion.messages$.pipe(filter(filterMessage))
			.subscribe({
				next() {
					connexion.send(<GetGameResponse> {
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
