import { createApp, onUnmounted, ref, Ref } from "vue";
import { render } from "./template";
import { createConnexion } from "ws-client";
import { Connection } from "connection-types";
import { connection$, getConnection, connectionState$, ConnectionState, offlineServer$, startOfflineServer, tabIsServer$ } from "offline";
import { OFFLINE_MODE, WS_PROTOCOL, WS_PORT, WEB_DOMAIN } from "config";
import ConnectionStatus from "user/components/connection-status";
import { GameComponent } from "./components/game";
import { action } from "player/async-api/action/node";
import { getGame } from "player/async-api/get-game/node";
import { observeGame } from "player/async-api/observe-game/node";
import { getMyCharacter } from "player/async-api/get-my-character/node";
import { observeMyCharacter } from "player/async-api/observe-my-character/node";
import { firstValueFrom, filter } from "rxjs";

if (OFFLINE_MODE) {
	const target = document.getElementById("connection-mount-point");
	new ConnectionStatus({ target });
}

export function resolveConnection(): Connection {
	if (OFFLINE_MODE) {
		return getConnection();
	} else {
		return createConnexion(WS_PROTOCOL, WS_PORT, WEB_DOMAIN);
	}
}

export const app = createApp({
	components: {
		GameComponent
	},
	setup() {
		const connection: Ref<Connection> = ref(resolveConnection());
		let gameKey: Ref<number> = ref(0);
		const showGame: Ref<boolean> = ref(false);

		connectionState$.subscribe(function(gameState) {
			showGame.value = gameState === ConnectionState.Connected;
		});

		if (OFFLINE_MODE) {
			const connectionSub = connection$.subscribe(function(value) {
				connection.value = value;
				gameKey.value = gameKey.value + 1;
			});

			onUnmounted(connectionSub.unsubscribe);

			firstValueFrom(tabIsServer$.pipe(filter(isServer => isServer)))
				.then(function() {
					action(offlineServer$);
					getGame(offlineServer$);
					observeGame(offlineServer$);
					getMyCharacter(offlineServer$)
					observeMyCharacter(offlineServer$);
					startOfflineServer();		
				})
				.catch(console.error);
		} else {
			showGame.value = true;
		}
		
		return { connection, showGame, gameKey };
	},
	render
});

app.mount("#game-mount-point");
