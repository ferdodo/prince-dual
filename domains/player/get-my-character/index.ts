import { send, messages$ } from "client";
import { filter, firstValueFrom, Observable } from "rxjs";
import { Character } from "character";

import {
	GetMyCharacterMessage,
	GetMyCharacterResponse,
	filterMessage,
	getMyCharacterEventType
} from "./model";

export async function getMyCharacter(): Promise<Character> {
	const m$ = messages$.pipe(filter(filterMessage)) as Observable<GetMyCharacterResponse>;
	const response: Promise<GetMyCharacterResponse> = firstValueFrom(m$);
	await send(<GetMyCharacterMessage>{ eventType: getMyCharacterEventType });
	return (await response).content;
}
