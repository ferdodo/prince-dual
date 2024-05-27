import type { Character } from "core";

export interface GetMyCharacterResponse {
	requestId: string;
	character: Character;
}
