import type { Connection } from "connection-types";
import { type Observable, filter, type Subscription, map, mergeMap, tap } from "rxjs";
import { resolveMyCharacter, type Message, type GetMyCharacterRequest, type GameStorage } from "core";

export function getMyCharacterHandle(
	gameStorage: GameStorage,
	connexions$: Observable<Connection<Message>>
): Subscription {
	return connexions$.pipe(
		mergeMap(function(connection) {
			return connection.messages$.pipe(
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
			);
		})
	)
		.subscribe();
}
