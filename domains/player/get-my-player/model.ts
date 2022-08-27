import { Message } from "ws-server";
import { MyPlayer } from "player";

export type GetMyPlayerMessage = {
	eventType: "GET_MY_PLAYER"
}

export type GetMyPlayerResponse =  {
	eventType: "GET_MY_PLAYER",
	content: MyPlayer
}

export function filterMessage(message: Message): boolean {
	return message.eventType === "GET_MY_PLAYER";
}
