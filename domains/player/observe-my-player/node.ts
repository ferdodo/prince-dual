import { Connexion } from "ws-server";
import { Observable, Subscription } from "rxjs";
import { watchGame } from "game/node";
import { ObserveGameBroadcast } from "./model";
import { resolveMyPlayer } from "player/node";

export function observeMyPlayer(connexions$: Observable<Connexion>): Subscription {
	return connexions$.subscribe(function(connexion: Connexion) {
		const subscription = watchGame()
			.subscribe(function() {
				connexion.send(<ObserveGameBroadcast> {
					eventType: "MY_PLAYER_UPDATE",
					content: resolveMyPlayer(connexion)
				});
			});

		const messageSubscription = connexion.messages$.subscribe({
			complete() {
				subscription.unsubscribe();
				messageSubscription.unsubscribe();
			}
		})
	});
}
