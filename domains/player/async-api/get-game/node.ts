import { Connection } from "connection-types";
import { Observable, filter, Subscription, map } from "rxjs";
import { readGame } from "game/node";
import { Message } from "../message";
import { GetGameRequest } from "./model";

export function getGame(connexions$: Observable<Connection<Message>>): Subscription {
	return connexions$.subscribe(function(connection: Connection<Message>) {
		const subscription = connection.messages$.pipe(
			map(m => m.getGameRequest),
			filter(Boolean),
		)
			.subscribe({
				next(request: GetGameRequest) {
					const response: Message = {
						getGameResponse: {
							requestId: request.requestId,
							game: readGame()
						}
					};
				
					connection.send(response);
				},
				complete() {
					subscription.unsubscribe();
				}
			});
	});
}
