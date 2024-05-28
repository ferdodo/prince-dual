import { createWsClientConnection } from "./create-ws-client-connection";
import { createRtcConnection } from "./create-rtc-connection";
import type { Context } from "core/types";
import { createConfigStorage, Character, mountApp } from "core";

const configStorage = createConfigStorage({
	webProtocol: "http",
	webDomain: "localhost",
	webPort: 3366,
	wsProtocol: "ws",
	wsPort: 3377,
	offlineMode: true,
	offlineModeCharacter: Character.None
});

const context: Context = {
	configStorage,
	createRtcConnection,
	createWsClientConnection
};

mountApp(document.body, context);