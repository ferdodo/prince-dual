import { readGame } from "game/node";
import { MyPlayer } from "player";
import { Connexion } from "ws-server";

export function resolveMyPlayer(connexion: Connexion): MyPlayer {
	const game = readGame();

	switch(connexion.id) {
		case game.playerA:
			return MyPlayer.PlayerA;
		case game.playerB:
			return MyPlayer.PlayerB;
		default:
			return MyPlayer.None;
	}
}
