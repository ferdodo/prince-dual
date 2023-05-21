import { Observable, share, ReplaySubject, Subscription } from "rxjs";
import { Message } from "link";
import { WS_PROTOCOL, WS_PORT, WEB_DOMAIN } from "config";

const socket$: ReplaySubject<WebSocket> = new ReplaySubject(1);
let connected = false;

async function getSocket(): Promise<WebSocket> {
	const socket: WebSocket = await new Promise(function(resolve) {
		const subscription: Subscription = socket$.subscribe(function(socket: WebSocket) {
			resolve(socket);
		});

		subscription.unsubscribe();
	});

	return socket;
}

export async function connect() {
	if (connected === false) {
		const wsUrl = getWsUrl();
		const socket: WebSocket = new WebSocket(wsUrl);

		await new Promise(function(resolve) {
			socket.onopen = () => resolve(undefined);
		});

		socket$.next(socket);
		connected = true;
	}
}

export const waitDisconnected = getSocket()
	.then(function(socket: WebSocket) {
		return new Promise(function (resolve) {
			socket.onclose = () => resolve(undefined);
		});
	});

export async function send(message) {
	const socket: WebSocket = await getSocket();
	const serialized = JSON.stringify(message);
	socket.send(serialized);
}

export const messages$: Observable<Message> = new Observable<Message>(function(subscriber) {
	getSocket()
		.then(function(socket: WebSocket) {
			socket.onmessage = function(event) {
				const deserialized = JSON.parse(event.data);
				subscriber.next(deserialized);
			};
		})
		.catch(error => subscriber.error(error));

	waitDisconnected
		.then(() => subscriber.complete())
		.catch(error => subscriber.error(error));
})
	.pipe(share());

function getWsUrl(): string {
	const showPort = WS_PROTOCOL === 'ws' && WS_PORT != "80"
		|| WS_PROTOCOL === 'wss' && WS_PORT != "443";

	return`${ WS_PROTOCOL }://${ WEB_DOMAIN }${ showPort ? (":"+WS_PORT) : "" }/ws`;
}
