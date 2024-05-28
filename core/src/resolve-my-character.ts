import type { GameStorage, Message } from "core/types";
import type { Connection } from "connection-types";
import { Character } from "core";

export function resolveMyCharacter(
	gameStorage: GameStorage,
	connection: Connection<Message>
): Character {
	const game = gameStorage.read();

	switch (connection.id) {
		case game.playerA:
			return Character.PlayerA;
		case game.playerB:
			return Character.PlayerB;
		default:
			return Character.None;
	}
}
