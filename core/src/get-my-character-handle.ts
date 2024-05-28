import type { Connection } from "connection-types";
import type { Observable, Subscription } from "rxjs";
import type { Message, GetMyCharacterRequest, GameStorage } from "core/types";
import { filter, map, mergeMap, tap } from "rxjs";
import { resolveMyCharacter } from "core";

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
