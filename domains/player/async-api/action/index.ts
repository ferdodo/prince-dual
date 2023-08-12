import { Message } from "../message";
import { Connection } from "connection-types";

export async function action(connection: Connection<Message>) {
	const message: Message = { actionEmit: {} };
	await connection.send(message);
}
