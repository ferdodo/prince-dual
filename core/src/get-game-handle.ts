import type { Connection } from "connection-types";
import { type Observable, filter, type Subscription, map } from "rxjs";
import type { Message, GetGameRequest, GameStorage } from "core/types";

export function getGameHandle(gameStorage: GameStorage, connexions$: Observable<Connection<Message>>): Subscription {
	return connexions$.subscribe(function(connection: Connection<Message>) {
		const subscription = connection.messages$.pipe(
			map(m => m.getGameRequest),
			filter(Boolean)
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
