import { filter, firstValueFrom, map, Observable } from "rxjs";
import { Character, Message, GetMyCharacterResponse } from "core";
import { Connection } from "connection-types";
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
