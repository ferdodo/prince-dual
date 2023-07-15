import { filter, firstValueFrom, Observable } from "rxjs";
import { Character } from "character";
import { Connection } from "connection-types";

import {
	GetMyCharacterMessage,
	GetMyCharacterResponse,
	filterMessage,
	getMyCharacterEventType
} from "./model";

export async function getMyCharacter(connection: Connection): Promise<Character> {
	const m$ = connection.messages$.pipe(filter(filterMessage)) as Observable<GetMyCharacterResponse>;
	const response: Promise<GetMyCharacterResponse> = firstValueFrom(m$);
	await connection.send(<GetMyCharacterMessage>{ messageType: getMyCharacterEventType });
	return (await response).content;
}
