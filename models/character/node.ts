import { readGame } from "game/node";
import { Character } from "character";
import { Connexion } from "ws-server";

export function resolveMyCharacter(connexion: Connexion): Character {
	const game = readGame();

	switch(connexion.id) {
		case game.playerA:
			return Character.PlayerA;
		case game.playerB:
			return Character.PlayerB;
		default:
			return Character.None;
	}
}
