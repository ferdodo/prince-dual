import { Character } from "character";

export interface GetMyCharacterRequest {
	requestId: string;
}

export interface GetMyCharacterResponse {
	requestId: string;
	character: Character;
}
