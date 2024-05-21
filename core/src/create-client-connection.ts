import { Context, createGameStorage, initiateBackendHandlers, Message } from "core";
import { Connection } from "connection-types";

export function createClientConnection(context: Context): Connection<Message> {
    const config = context.configStorage.read();

	if (config.offlineMode) {
        context.offlineModeGameStorage = createGameStorage();
		const [createConnection, serverConnection$] = context.createRtcConnection();
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