import { filter, map, firstValueFrom, type Observable } from "rxjs";
import type { Game, Message, GetGameResponse } from "core/types";
import type { Connection } from "connection-types";
import { uid } from "uid";

export async function getGame(connection: Connection<Message>): Promise<Game> {
	const requestId = uid();

	const response$: Observable<GetGameResponse> = connection.messages$.pipe(
		map(m => m.getGameResponse),
		filter(Boolean),
		filter(response => response.requestId === requestId)
	);

	const response: Promise<GetGameResponse> = firstValueFrom(response$);
	const request: Message = { getGameRequest: { requestId } };
	await connection.send(request);
	const game = (await response).game;
	return game;
}
