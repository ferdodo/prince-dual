import { ActionMessage } from "./model";
import { Connexion } from "link";

export async function action(connexion: Connexion) {
	const message: ActionMessage = { eventType: "ACTION" };
	await connexion.send(message);
}
