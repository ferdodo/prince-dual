import { Connexion } from "ws-server";
import { Observable, Subscription } from "rxjs";
import { watchGame } from "game/node";
import { Game } from "game";
import { ObserveGameBroadcast } from "./model";

export function observeGame(connexions$: Observable<Connexion>): Subscription {
	return connexions$.subscribe(function(connexion: Connexion) {
		const subscription = watchGame()
			.subscribe(function(game: Game) {
				connexion.send(<ObserveGameBroadcast> {
					eventType: "GAME_UPDATE",
					content: game
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
