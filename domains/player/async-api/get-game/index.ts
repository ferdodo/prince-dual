import { filter, map, firstValueFrom, Observable } from "rxjs";
import { Game } from "game";
import { Connection } from "connection-types";
import { Message } from "../message";
import { uid } from "uid";
import { GetGameResponse } from "./model";

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
	return (await response).game;	
}
