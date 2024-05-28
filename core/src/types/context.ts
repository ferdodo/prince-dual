import type { Connection } from "connection-types";
import type { Message, GameStorage, ConfigStorage } from "core/types";
import type { Observable } from "rxjs";

export interface Context {
	configStorage: ConfigStorage;
	offlineModeGameStorage?: GameStorage;
	createRtcConnection: (
		configStorage: ConfigStorage
	) => Promise<[() => Connection<Message>, Observable<Connection<Message>>]>;
	createWsClientConnection: (
		wsProtocol: string,
		wsPort: number,
		domain: string
	) => Connection<Message>;
}
