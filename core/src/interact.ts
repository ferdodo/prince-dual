import { Message } from "core";
import { Connection } from "connection-types";

export async function interact(connection: Connection<Message>) {
	const message: Message = { interactEmit: {} };
	await connection.send(message);
}
