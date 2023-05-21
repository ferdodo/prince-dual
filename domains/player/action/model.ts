import { Message } from "link";

export type ActionMessage = {
	eventType: "ACTION"
}

export function filterMessage(message: Message): boolean {
	return message.eventType === "ACTION";
}
