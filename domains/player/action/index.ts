import { send } from "client";
import { ActionMessage } from "./model";

export async function action() {
	const message: ActionMessage = { eventType: "ACTION" };
	await send(message);
}
