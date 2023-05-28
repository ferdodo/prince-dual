import { filter, firstValueFrom, Observable } from "rxjs";
import { Character } from "character";
import { Connexion } from "link";

import {
	GetMyCharacterMessage,
	GetMyCharacterResponse,
	filterMessage,
	getMyCharacterEventType
} from "./model";

export async function getMyCharacter(connexion: Connexion): Promise<Character> {
	const m$ = connexion.messages$.pipe(filter(filterMessage)) as Observable<GetMyCharacterResponse>;
	const response: Promise<GetMyCharacterResponse> = firstValueFrom(m$);
	await connexion.send(<GetMyCharacterMessage>{ eventType: getMyCharacterEventType });
	return (await response).content;
}
