import { GetGameMessage, filterMessage } from "./model";
import { filter, firstValueFrom } from "rxjs";
import { Game } from "game";
import { Connexion, Message } from "link";

export async function getGame(connexion: Connexion): Promise<Game> {
	const m$ = connexion.messages$.pipe(filter(filterMessage));
	const response: Promise<Message> = firstValueFrom(m$);
	await connexion.send(<GetGameMessage>{ eventType: "GET_GAME" });
	return (await response).content;	
}
