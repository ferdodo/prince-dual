import { GetGameMessage, filterMessage } from "./model";
import { filter, firstValueFrom } from "rxjs";
import { Game } from "game";
import { Connection, Message } from "connection-types";

export async function getGame(connection: Connection): Promise<Game> {
	const m$ = connection.messages$.pipe(filter(filterMessage));
	const response: Promise<Message> = firstValueFrom(m$);
	await connection.send(<GetGameMessage>{ messageType: "GET_GAME" });
	return (await response).content;	
}
