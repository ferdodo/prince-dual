import { Connexion } from "ws-server";
import { filterMessage, GetMyCharacterResponse, getMyCharacterEventType } from "./model";
import { Observable, filter, Subscription } from "rxjs";
import { resolveMyCharacter } from "character/node";

export function getMyCharacter(connexions$: Observable<Connexion>): Subscription {
	return connexions$.subscribe(function(connexion: Connexion) {
		const subscription = connexion.messages$.pipe(filter(filterMessage))
			.subscribe({
				next() {				
					connexion.send(<GetMyCharacterResponse> {
						eventType: getMyCharacterEventType,
						content: resolveMyCharacter(connexion)
					});
				},
				complete(){
					subscription.unsubscribe();
				}
			});
	});
}
