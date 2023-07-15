import { ActionMessage } from "./model";
import { Connection } from "link";

export async function action(connection: Connection) {
	const message: ActionMessage = { eventType: "ACTION" };
	await connection.send(message);
}
