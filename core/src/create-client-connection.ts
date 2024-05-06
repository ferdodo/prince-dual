import { Context, createGameStorage, initiateBackendHandlers, Message } from "core";
import { Connection } from "connection-types";

export function createClientConnection(context: Context): Connection<Message> {
	if (context.config.offlineMode) {
        context.offlineModeGameStorage = createGameStorage();
		const [createConnection, serverConnection$] = context.createRtcConnection();
        initiateBackendHandlers(context.offlineModeGameStorage, serverConnection$);
        return createConnection();
	} else {
		return context.createWsClientConnection(
            context.config.wsProtocol,
            context.config.wsPort,
            context.config.webDomain
        );
	}
}