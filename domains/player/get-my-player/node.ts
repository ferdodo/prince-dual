import { Connexion } from "ws-server";
import { filterMessage, GetMyPlayerResponse } from "./model";
import { Observable, filter, Subscription } from "rxjs";
import { resolveMyPlayer } from "player/node";

export function getMyPlayer(connexions$: Observable<Connexion>): Subscription {
	return connexions$.subscribe(function(connexion: Connexion) {
		const subscription = connexion.messages$.pipe(filter(filterMessage))
			.subscribe({
				next() {				
					connexion.send(<GetMyPlayerResponse> {
						eventType: "GET_MY_PLAYER",
						content: resolveMyPlayer(connexion)
					});
				},
				complete(){
					subscription.unsubscribe();
				}
			});
	});
}
