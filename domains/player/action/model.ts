import { Message } from "ws-server";

export type ActionMessage = {
	eventType: "ACTION"
}

export function filterMessage(message: Message): boolean {
	return message.eventType === "ACTION";
}
