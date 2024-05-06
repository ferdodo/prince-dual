import { GameStorage, Character, Message } from "core";
import { Connection } from "connection-types";

export function resolveMyCharacter(gameStorage: GameStorage, connection: Connection<Message>): Character {
	const game = gameStorage.read();

	switch(connection.id) {
		case game.playerA:
			return Character.PlayerA;
		case game.playerB:
			return Character.PlayerB;
		default:
			return Character.None;
	}
}
