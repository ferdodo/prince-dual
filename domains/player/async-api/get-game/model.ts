import { Game } from "game";

export interface GetGameRequest {
	requestId: string;
}

export interface GetGameResponse {
	requestId: string;
	game: Game;
}
