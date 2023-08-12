import { GetGameRequest, GetGameResponse } from "./get-game/model";
import { GetMyCharacterRequest, GetMyCharacterResponse } from "./get-my-character/model";
import { ObserveGameBroadcast } from "./observe-game/model";
import { ObserveMyCharacterBroadcast } from "./observe-my-character/model";

export interface Message {
	actionEmit?: object;
	getGameRequest?: GetGameRequest;
	getGameResponse?: GetGameResponse;
	getMyCharacterRequest?: GetMyCharacterRequest;
	getMyCharacterResponse?: GetMyCharacterResponse;
	observeGameBroadcast?: ObserveGameBroadcast;
	observeMyCharacterBroadcast?: ObserveMyCharacterBroadcast;
}
