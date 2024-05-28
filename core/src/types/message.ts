
import type {
	GetGameRequest,
	GetGameResponse,
	GetMyCharacterRequest,
	GetMyCharacterResponse,
	ObserveGameBroadcast,
	ObserveMyCharacterBroadcast
} from "core/types";

export interface Message {
	interactEmit?: object;
	getGameRequest?: GetGameRequest;
	getGameResponse?: GetGameResponse;
	getMyCharacterRequest?: GetMyCharacterRequest;
	getMyCharacterResponse?: GetMyCharacterResponse;
	observeGameBroadcast?: ObserveGameBroadcast;
	observeMyCharacterBroadcast?: ObserveMyCharacterBroadcast;
}
