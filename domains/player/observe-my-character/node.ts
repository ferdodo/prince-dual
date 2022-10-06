import { Connexion } from "ws-server";
import { Observable, Subscription } from "rxjs";
import { watchGame } from "game/node";
import { ObserveMyCharacterBroadcast, observeMyCharacterEventType } from "./model";
import { resolveMyCharacter } from "character/node";

export function observeMyCharacter(connexions$: Observable<Connexion>): Subscription {
	return connexions$.subscribe(function(connexion: Connexion) {
		const subscription = watchGame()
			.subscribe(function() {
				connexion.send(<ObserveMyCharacterBroadcast> {
					eventType: observeMyCharacterEventType,
					content: resolveMyCharacter(connexion)
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
