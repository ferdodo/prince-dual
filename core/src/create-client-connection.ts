import { Context, createGameStorage, initiateBackendHandlers, Message } from "core";
import { Connection } from "connection-types";

export async function createClientConnection(context: Context): Promise<Connection<Message>> {
	const config = context.configStorage.read();

	if (config.offlineMode) {
		context.offlineModeGameStorage = createGameStorage();

		const [
			createConnection,
			serverConnection$
		] = await context.createRtcConnection(context.configStorage);

		initiateBackendHandlers(context.offlineModeGameStorage, serverConnection$);
		return createConnection();
	} else {
		return context.createWsClientConnection(
			config.wsProtocol,
			config.wsPort,
			config.webDomain
		);
	}
}
