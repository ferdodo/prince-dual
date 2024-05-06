import { Connection } from "connection-types";
import { Observable, filter, Subscription, map, mergeMap, tap } from "rxjs";
import { resolveMyCharacter, Message, GetMyCharacterRequest, GameStorage } from "core";

export function getMyCharacterHandle(gameStorage: GameStorage, connexions$: Observable<Connection<Message>>): Subscription {
	return connexions$.pipe(
		mergeMap(connection => connection.messages$.pipe(
			map(m => m.getMyCharacterRequest),
			filter(Boolean),
			tap(function(request: GetMyCharacterRequest) {
				connection.send({
					getMyCharacterResponse: {
						requestId: request.requestId,
						character: resolveMyCharacter(gameStorage, connection)
					}
				});
			})
		))
	)
		.subscribe();
}
