import { readGame } from "game/node";
import { Character } from ".";
import { Connection } from "connection-types";

export function resolveMyCharacter(connection: Connection): Character {
	const game = readGame();

	switch(connection.id) {
		case game.playerA:
			return Character.PlayerA;
		case game.playerB:
			return Character.PlayerB;
		default:
			return Character.None;
	}
}
