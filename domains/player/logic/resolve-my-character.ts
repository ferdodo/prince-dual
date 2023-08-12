import { readGame } from "game/node";
import { Character } from "character";
import { Connection } from "connection-types";
import { Message } from "../async-api/message";

export function resolveMyCharacter(connection: Connection<Message>): Character {
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
