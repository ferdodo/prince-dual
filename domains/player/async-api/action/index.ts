import { ActionMessage } from "./model";
import { Connection } from "connection-types";

export async function action(connection: Connection) {
	const message: ActionMessage = { messageType: "ACTION" };
	await connection.send(message);
}
