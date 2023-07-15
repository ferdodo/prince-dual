import { Message } from "connection-types";

export type ActionMessage = {
	messageType: "ACTION"
}

export function filterMessage(message: Message): boolean {
	return message.messageType === "ACTION";
}
