import { createWsClientConnection } from "./create-ws-client-connection";
import { createRtcConnection } from "./create-rtc-connection";

import {
	Playground,
	SvelteContext,
	Context,
	defaultContextId,
	ManualRtc,
	createConfigStorage,
	Character
} from "core";

const configStorage = createConfigStorage({
	webProtocol: "http",
	webDomain: "localhost",
	webPort: 3366,
	wsProtocol: "ws",
	wsPort: 3377,
	offlineMode: true,
	offlineModeCharacter: Character.None
});

const _context: Context = {
	configStorage,
	createRtcConnection,
	createWsClientConnection
};

const context: SvelteContext = new Map()
	.set(defaultContextId, _context);

const target = document.getElementById("game-mount-point");


if (target) {
	new Playground({ target, context });
}

const connTarget = document.getElementById("connection-mount-point");

if (connTarget) {
	new ManualRtc({ target: connTarget, context });
}
