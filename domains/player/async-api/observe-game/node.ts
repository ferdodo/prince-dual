import { Connection } from "link";
import { Observable, Subscription } from "rxjs";
import { watchGame } from "game/node";
import { Game } from "game";
import { ObserveGameBroadcast } from "./model";

export function observeGame(connexions$: Observable<Connection>): Subscription {
	return connexions$.subscribe(function(connection: Connection) {
		const subscription = watchGame()
			.subscribe(function(game: Game) {
				connection.send(<ObserveGameBroadcast> {
					eventType: "GAME_UPDATE",
					content: game
				});
			});

		const messageSubscription = connection.messages$.subscribe({
			complete() {
				subscription.unsubscribe();
				messageSubscription.unsubscribe();
			}
		})
	});
}
