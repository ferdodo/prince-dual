import { Character } from "character";
import { Message } from "connection-types";

export const observeMyCharacterEventType = "MY_CHARACTER_UPDATE";

export type ObserveMyCharacterBroadcast = {
	messageType: "MY_CHARACTER_UPDATE",
	content: Character
};

export function filterMessage(message: Message) {
	return message.messageType === observeMyCharacterEventType;
}
