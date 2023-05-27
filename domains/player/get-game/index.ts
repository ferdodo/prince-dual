import { GetGameMessage, GetGameResponse, filterMessage } from "./model";
import { send, messages$ } from "client";
import { filter, firstValueFrom, Observable } from "rxjs";
import { Game } from "game";

export async function getGame(): Promise<Game> {
	const m$ = messages$.pipe(filter(filterMessage)) as Observable<GetGameResponse>;
	const response: Promise<GetGameResponse> = firstValueFrom(m$);
	await send(<GetGameMessage>{ eventType: "GET_GAME" });
	return (await response).content;	
}
