import { MyPlayer } from "player";
import { Message } from "ws-server";

export type ObserveGameBroadcast = {
	eventType: "MY_PLAYER_UPDATE",
	content: MyPlayer
};

export function filterMessage(message: Message) {
	return message.eventType === "MY_PLAYER_UPDATE";
}
