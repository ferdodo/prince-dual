import { Connection } from "connection-types";
import { Observable, filter, Subscription, map } from "rxjs";
import { resolveMyCharacter } from "../../logic/resolve-my-character";
import { Message } from "../message";
import { GetMyCharacterRequest } from "./model";

export function getMyCharacter(connexions$: Observable<Connection<Message>>): Subscription {
	return connexions$.subscribe(function(connection: Connection<Message>) {
		const subscription = connection.messages$.pipe(
			map(m => m.getMyCharacterRequest),
			filter(Boolean)
		)
			.subscribe({
				next(request: GetMyCharacterRequest) {
					connection.send({
						getMyCharacterResponse: {
							requestId: request.requestId,
							character: resolveMyCharacter(connection)
						}
					});
				},
				complete() {
					subscription.unsubscribe();
				}
			});
	});
}
