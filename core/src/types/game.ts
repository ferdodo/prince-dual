import { GameState } from "core";

export interface Game {
	state: GameState;
	playerA?: Number;
	playerB?: Number;
}
