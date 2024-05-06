import { Config, Message, GameStorage } from "core";
import { Observable } from "rxjs";
import { Connection } from "connection-types";

export interface Context {
	config: Config;
    offlineModeGameStorage?: GameStorage;
    createRtcConnection: () => [() => Connection<Message>, Observable<Connection<Message>>];
    createWsClientConnection: (wsProtocol: string, wsPort: number, domain: string) => Connection<Message>;
}

export interface SvelteContext extends Map<string, Context> {
}