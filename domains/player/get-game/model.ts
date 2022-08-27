import { Game } from "game";
import { Message } from "ws-server";

export type GetGameMessage = {
	eventType: "GET_GAME"
}

export type GetGameResponse =  {
	eventType: "GET_GAME",
	content: Game
}

export function filterMessage(message: Message): boolean {
	return message.eventType === "GET_GAME";
}
