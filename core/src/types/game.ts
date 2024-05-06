import { GameState } from "core";

export type Game = {
	state: GameState,
	playerA?: Number,
	playerB?: Number
}