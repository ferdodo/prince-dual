import { filter, firstValueFrom, map, type Observable } from "rxjs";
import type { Message, GetMyCharacterResponse } from "core/types";
import type { Character } from "core";
import type { Connection } from "connection-types";
import { uid } from "uid";

export async function getMyCharacter(connection: Connection<Message>): Promise<Character> {
	const requestId = uid();

	const response$: Observable<GetMyCharacterResponse> = connection.messages$.pipe(
		map(m => m.getMyCharacterResponse),
		filter(Boolean),
		filter(r => r.requestId === requestId)
	);

	const response: Promise<GetMyCharacterResponse> = firstValueFrom(response$);
	const request: Message = { getMyCharacterRequest: { requestId } };
	await connection.send(request);
	return (await response).character;
}
