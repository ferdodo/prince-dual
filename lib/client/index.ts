import { OFFLINE_MODE } from "config";
import { Connection } from "connection-types";
import { createConnexion as createOnlineConnexion } from "ws-client";
import { createConnexion as createOfflineConnexion } from "offline";

export function createConnexion(): Connection {
	if (OFFLINE_MODE) {
		return createOfflineConnexion();
	} else {
		return createOnlineConnexion();
	}
}
