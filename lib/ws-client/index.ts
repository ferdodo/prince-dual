import { Observable, share } from "rxjs";
import { Message } from "ws-server";
import "config/constants";

const wsUrl = getWsUrl();
const socket = new WebSocket(wsUrl);

export const waitConnected = new Promise(function(resolve) {
	socket.onopen = () => resolve(undefined);
});

export const waitDisconnected = new Promise(function(resolve) {
	socket.onclose = () => resolve(undefined);
});

export async function send(message) {
	const serialized = JSON.stringify(message);
	await waitConnected;
	socket.send(serialized);
}

export const messages$: Observable<Message> = new Observable<Message>(function(subscriber) {
	socket.onmessage = function(event) {
		const deserialized = JSON.parse(event.data);
		subscriber.next(deserialized);
	};

	waitDisconnected
		.then(() => subscriber.complete())
		.catch(console.error);
})
	.pipe(share());

function getWsUrl(): string {
	const showPort = PRINCE_DUALS_WS_PROTOCOL === 'ws' && PRINCE_DUALS_WS_PORT != "80"
		|| PRINCE_DUALS_WS_PROTOCOL === 'wss' && PRINCE_DUALS_WS_PORT != "443";

	return`${ PRINCE_DUALS_WS_PROTOCOL }://${ PRINCE_DUALS_WEB_DOMAIN }${ showPort ? (":"+PRINCE_DUALS_WS_PORT) : "" }/ws`;
}
