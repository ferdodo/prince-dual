import { Playground, SvelteContext, Context, defaultContextId, ManualRtc } from "core";
import { createWsClientConnection } from "./create-ws-client-connection";
import { createRtcConnection } from "./create-rtc-connection";

const _context: Context = {
	config: {
		webProtocol: "http",
		webDomain: "localhost",
		webPort: 3377,
		wsProtocol: "ws",
		wsPort: 3377,
		offlineMode: false
	},
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
	new ManualRtc({ target: connTarget });
}
