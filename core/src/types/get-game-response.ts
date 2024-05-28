import type { Game } from "core/types";

export interface GetGameResponse {
	requestId: string;
	game: Game;
}
