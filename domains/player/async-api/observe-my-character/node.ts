import { Connection } from "connection-types";
import { Observable, Subscription } from "rxjs";
import { watchGame } from "game/node";
import { resolveMyCharacter } from "../../logic/resolve-my-character";
import { Message } from "../message"

export function observeMyCharacter(connexions$: Observable<Connection<Message>>): Subscription {
	return connexions$.subscribe(function(connection: Connection<Message>) {
		const subscription = watchGame()
			.subscribe(function() {
				connection.send({
					observeMyCharacterBroadcast: {
						character: resolveMyCharacter(connection)
					}
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
