import type { Message } from "core/types";
import type { Connection } from "connection-types";

export async function interact(connection: Connection<Message>) {
	const message: Message = { interactEmit: {} };
	await connection.send(message);
}
