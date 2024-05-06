import { Connection } from "connection-types";
import { Observable, filter, Subscription, map } from "rxjs";
import { Message, GetGameRequest, GameStorage } from "core";

export function getGameHandle(gameStorage: GameStorage, connexions$: Observable<Connection<Message>>): Subscription {
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
							game: gameStorage.read()
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
