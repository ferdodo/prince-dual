import type { GameState } from "core";

export interface Game {
	state: GameState;
	playerA?: number;
	playerB?: number;
}
