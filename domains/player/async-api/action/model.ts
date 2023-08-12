import { Message } from "../message";

export function filterMessage(message: Message): boolean {
	return Boolean(message.actionEmit);
}
