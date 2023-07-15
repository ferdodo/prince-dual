import { Game } from "game";
import { Message } from "connection-types";

export type GetGameMessage = {
	messageType: "GET_GAME"
}

export type GetGameResponse =  {
	messageType: "GET_GAME",
	content: Game
}

export function filterMessage(message: Message): boolean {
	return message.messageType === "GET_GAME";
}
