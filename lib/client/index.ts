import { 
	connect as wsConnect,
	waitDisconnected as wsWaitDisconnected,
	send as wsSend,
	messages$ as wsMessages$
} from "ws-client";

export const connect = wsConnect;
export const waitDisconnected = wsWaitDisconnected;
export const send = wsSend;
export const messages$ = wsMessages$;

