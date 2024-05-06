import { Connection } from "connection-types";
import { Observable, Subscription } from "rxjs";
import { Game, GameStorage, Message } from "core";

export function observeGameHandle(gameStorage: GameStorage, connexions$: Observable<Connection<Message>>): Subscription {
	return connexions$.subscribe(function(connection: Connection<Message>) {
		const subscription = gameStorage.watch()
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
