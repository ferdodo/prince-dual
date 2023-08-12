import { createApp, onUnmounted, ref, Ref } from "vue";
import { render } from "./template";
import { createConnexion } from "ws-client";
import { Connection } from "connection-types";
import { createRtcConnection } from "offline";
import { OFFLINE_MODE, WS_PROTOCOL, WS_PORT, WEB_DOMAIN } from "config";
import { GameComponent } from "./components/game";
import { action } from "player/async-api/action/node";
import { getGame } from "player/async-api/get-game/node";
import { observeGame } from "player/async-api/observe-game/node";
import { getMyCharacter } from "player/async-api/get-my-character/node";
import { observeMyCharacter } from "player/async-api/observe-my-character/node";
import { Message } from "player/async-api/message";

export function resolveConnection(): Connection<Message> {
	if (OFFLINE_MODE) {
		const [connection, server$] = createRtcConnection<Message>();
		action(server$);
		getGame(server$);
		observeGame(server$);
		getMyCharacter(server$)
		observeMyCharacter(server$);
		return connection
	} else {
		return createConnexion<Message>(WS_PROTOCOL, WS_PORT, WEB_DOMAIN);
	}
}

export const app = createApp({
	components: {
		GameComponent
	},
	setup() {
		const connection: Ref<Connection<Message>> = ref(resolveConnection());
		let gameKey: Ref<number> = ref(0);
		const showGame: Ref<boolean> = ref(true);
		let messageSubscription;
		onUnmounted(() => messageSubscription?.unsubscribe());
		return { connection, showGame, gameKey };
	},
	render
});

app.mount("#game-mount-point");
