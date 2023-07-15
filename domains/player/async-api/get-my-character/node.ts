import { Connection } from "connection-types";
import { filterMessage, GetMyCharacterResponse, getMyCharacterEventType } from "./model";
import { Observable, filter, Subscription } from "rxjs";
import { resolveMyCharacter } from "character/node";

export function getMyCharacter(connexions$: Observable<Connection>): Subscription {
	return connexions$.subscribe(function(connection: Connection) {
		const subscription = connection.messages$.pipe(filter(filterMessage))
			.subscribe({
				next() {				
					connection.send(<GetMyCharacterResponse> {
						messageType: getMyCharacterEventType,
						content: resolveMyCharacter(connection)
					});
				},
				complete(){
					subscription.unsubscribe();
				}
			});
	});
}
