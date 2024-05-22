import { Message, GameStorage, ConfigStorage, Config } from "core";
import { Observable } from "rxjs";
import { Connection } from "connection-types";

export interface Context {
	configStorage: ConfigStorage;
    offlineModeGameStorage?: GameStorage;
    createRtcConnection: (configStorage: ConfigStorage) => Promise<[() => Connection<Message>, Observable<Connection<Message>>]>;
    createWsClientConnection: (wsProtocol: string, wsPort: number, domain: string) => Connection<Message>;
}

export interface SvelteContext extends Map<string, Context> {
}