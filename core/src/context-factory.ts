import { Context, SvelteContext, ConfigFactory, Message, Config, initiateBackendHandlers, createGameStorage, GameStorage, createBidirectionalConnectionMock } from "core";
import { Subject, Observable, NEVER } from "rxjs";
import { Connection } from "connection-types";
import { uid } from "uid";

let _rtcServerConnetion$: Subject<Connection<Message>> | null = null;

export class ContextFactory {
    rtcServer = false;
    _serverConnexion$: Subject<Connection<Message>>;
    serverConnexion$: Observable<Connection<Message>>;
    config: Config;
    context: Context;
	contextId: string = uid();

    constructor() {
        this._serverConnexion$ = new Subject();
        const configFactory = new ConfigFactory();
        this.config = configFactory.build();

        this.serverConnexion$ = this._serverConnexion$.asObservable();


        this.context = {
            config: this.config,
            createRtcConnection: () => {
                if (!this.config.offlineMode) {
                    throw new Error("Shall only create RTC connections in offline mode !");
                }

                if (!_rtcServerConnetion$) {
                    this.rtcServer = true;
                    _rtcServerConnetion$ = new Subject();
                }

                const createConnection = () => {
                    const [clientConnection, serverConnection] = createBidirectionalConnectionMock();
                    _rtcServerConnetion$.next(serverConnection);
                    return clientConnection;
                }

                const rtcServerConnextion$ = this.rtcServer
                    ? _rtcServerConnetion$.asObservable()
                    : NEVER;

                return [createConnection, rtcServerConnextion$];
            },
            createWsClientConnection:() => {
                if (this.config.offlineMode) {
                    throw new Error("Shall only create connection to server in online mode !");
                }

                const [clientConnection, serverConnection] = createBidirectionalConnectionMock();
                
                this._serverConnexion$.next(serverConnection);
                return clientConnection;
            }
        }
    }

    setOffline() {
        this.config.offlineMode = true;
    }

    build(): SvelteContext {
        const svelteContext: SvelteContext = new Map();
		return svelteContext.set(this.contextId, this.context);
    }

	getContextId(): string {
		return this.contextId;
	}

	getContext(): Context {
		return this.context;
	}
}