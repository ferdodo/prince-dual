import { Message } from "link";
import { Character } from "character";

export const getMyCharacterEventType = "GET_MY_CHARACTER";

export type GetMyCharacterMessage = {
	eventType: "GET_MY_CHARACTER"
}

export type GetMyCharacterResponse =  {
	eventType: "GET_MY_CHARACTER",
	content: Character
}

export function filterMessage(message: Message): boolean {
	return message.eventType === getMyCharacterEventType;
}
