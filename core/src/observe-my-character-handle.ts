import type { Connection } from "connection-types";
import type { Observable, Subscription } from "rxjs";
import { resolveMyCharacter, type GameStorage, type Message } from "core";

export function observeMyCharacterHandle(gameStorage: GameStorage, connexions$: Observable<Connection<Message>>): Subscription {
	return connexions$.subscribe(function(connection: Connection<Message>) {
		const subscription = gameStorage.watch()
			.subscribe(function() {
				connection.send({
					observeMyCharacterBroadcast: {
						character: resolveMyCharacter(gameStorage, connection)
					}
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
