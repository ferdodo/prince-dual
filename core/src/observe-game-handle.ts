import type { Connection } from "connection-types";
import type { Observable, Subscription } from "rxjs";
import type { Game, GameStorage, Message } from "core/types";

export function observeGameHandle(
	gameStorage: GameStorage,
	connexions$: Observable<Connection<Message>>
): Subscription {
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
		});
	});
}
