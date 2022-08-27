import { GetMyPlayerMessage, GetMyPlayerResponse, filterMessage } from "./model";
import { send, messages$ } from "ws-client";
import { filter, firstValueFrom, Observable } from "rxjs";
import { MyPlayer } from "player";

export async function getMyPlayer(): Promise<MyPlayer> {
	const m$ = messages$.pipe(filter(filterMessage)) as Observable<GetMyPlayerResponse>;
	const response: Promise<GetMyPlayerResponse> = firstValueFrom(m$);
	await send(<GetMyPlayerMessage>{ eventType: "GET_MY_PLAYER" });
	return (await response).content;	
}
