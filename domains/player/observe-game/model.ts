import { Game } from "game";
import { Message } from "link";

export const eventType = "GAME_UPDATE";

export type ObserveGameBroadcast = {
	eventType: "GAME_UPDATE",
	content: Game
};

export function filterMessage(message: Message) {
	return message.eventType === "GAME_UPDATE";
}
