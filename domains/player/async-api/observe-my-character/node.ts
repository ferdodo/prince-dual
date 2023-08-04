import { Connection } from "connection-types";
import { Observable, Subscription } from "rxjs";
import { watchGame } from "game/node";
import { ObserveMyCharacterBroadcast, observeMyCharacterEventType } from "./model";
import { resolveMyCharacter } from "../../logic/resolve-my-character";

export function observeMyCharacter(connexions$: Observable<Connection>): Subscription {
	return connexions$.subscribe(function(connection: Connection) {
		const subscription = watchGame()
			.subscribe(function() {
				connection.send(<ObserveMyCharacterBroadcast> {
					messageType: observeMyCharacterEventType,
					content: resolveMyCharacter(connection)
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
