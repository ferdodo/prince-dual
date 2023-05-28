import { Character } from "character";
import { Message } from "link";

export const observeMyCharacterEventType = "MY_CHARACTER_UPDATE";

export type ObserveMyCharacterBroadcast = {
	eventType: "MY_CHARACTER_UPDATE",
	content: Character
};

export function filterMessage(message: Message) {
	return message.eventType === observeMyCharacterEventType;
}
