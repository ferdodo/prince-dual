import { Observable, share } from "rxjs";
import { Message } from "link";
import { WS_PROTOCOL, WS_PORT, WEB_DOMAIN } from "config";

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
	const showPort = WS_PROTOCOL === 'ws' && WS_PORT != "80"
		|| WS_PROTOCOL === 'wss' && WS_PORT != "443";

	return`${ WS_PROTOCOL }://${ WEB_DOMAIN }${ showPort ? (":"+WS_PORT) : "" }/ws`;
}
