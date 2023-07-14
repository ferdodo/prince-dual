import { OFFLINE_MODE } from "config";
import { Connexion } from "link";
import { createConnexion as createOnlineConnexion } from "ws-client";
import { createConnexion as createOfflineConnexion } from "offline";

export function createConnexion(): Connexion {
	if (OFFLINE_MODE) {
		return createOfflineConnexion();
	} else {
		return createOnlineConnexion();
	}
}
