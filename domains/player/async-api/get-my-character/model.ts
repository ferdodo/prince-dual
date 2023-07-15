import { Message } from "connection-types";
import { Character } from "character";

export const getMyCharacterEventType = "GET_MY_CHARACTER";

export type GetMyCharacterMessage = {
	messageType: "GET_MY_CHARACTER"
}

export type GetMyCharacterResponse =  {
	messageType: "GET_MY_CHARACTER",
	content: Character
}

export function filterMessage(message: Message): boolean {
	return message.messageType === getMyCharacterEventType;
}
