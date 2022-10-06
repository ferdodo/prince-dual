import { Character } from "character";
import { Message } from "ws-server";

export const observeMyCharacterEventType = "MY_CHARACTER_UPDATE";

export type ObserveMyCharacterBroadcast = {
	eventType: "MY_CHARACTER_UPDATE",
	content: Character
};

export function filterMessage(message: Message) {
	return message.eventType === observeMyCharacterEventType;
}
