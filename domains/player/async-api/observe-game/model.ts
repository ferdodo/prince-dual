import { Game } from "game";
import { Message } from "connection-types";

export const messageType = "GAME_UPDATE";

export type ObserveGameBroadcast = {
	messageType: "GAME_UPDATE",
	content: Game
};

export function filterMessage(message: Message) {
	return message.messageType === "GAME_UPDATE";
}
