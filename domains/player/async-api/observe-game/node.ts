import { Connection } from "connection-types";
import { Observable, Subscription } from "rxjs";
import { watchGame } from "game/node";
import { Game } from "game";
import { Message } from "../message";

export function observeGame(connexions$: Observable<Connection<Message>>): Subscription {
	return connexions$.subscribe(function(connection: Connection<Message>) {
		const subscription = watchGame()
			.subscribe(function(game: Game) {
				connection.send({
					observeGameBroadcast: { game }
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
