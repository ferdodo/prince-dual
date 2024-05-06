import {
    GetGameRequest,
    GetGameResponse,
    GetMyCharacterRequest,
    GetMyCharacterResponse,
    ObserveGameBroadcast,
    ObserveMyCharacterBroadcast
} from "core";

export interface Message {
	interactEmit?: object;
	getGameRequest?: GetGameRequest;
	getGameResponse?: GetGameResponse;
	getMyCharacterRequest?: GetMyCharacterRequest;
	getMyCharacterResponse?: GetMyCharacterResponse;
	observeGameBroadcast?: ObserveGameBroadcast;
	observeMyCharacterBroadcast?: ObserveMyCharacterBroadcast;
}
