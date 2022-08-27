import { createApp, ref, Ref, onUnmounted, computed } from "vue";
import { render } from "./template";
import { Game, GameState } from "game";
import { waitConnected, waitDisconnected, send } from "ws-client";
import { observeGame } from "player/observe-game";
import { observeMyPlayer } from "player/observe-my-player";
import { getGame } from "player/get-game";
import { getMyPlayer } from "player/get-my-player";
import { action } from "player/action";
import { fromEvent, throttleTime, merge } from "rxjs";
import { MyPlayer } from "player";

setInterval(function keepAlive() {
	send({ eventType: "KEEP_ALIVE" })
		.catch(console.error);
}, 25000);

export const app = createApp({
	setup() {
		const myPlayer: Ref<MyPlayer | null> = ref(null);
		const game: Ref<Game | null> = ref(null);
		const disconnected: Ref<boolean> = ref(false);
	
		const gameSub = observeGame()
			.subscribe(value => game.value = value);

		const myPlayerSub = observeMyPlayer()
			.subscribe(value => myPlayer.value = value);

		getGame()
			.then(value => game.value = value)
			.catch(console.error);

		getMyPlayer()
			.then(value => myPlayer.value = value)
			.catch(console.error);

		waitDisconnected
			.then(() => disconnected.value = true)
			.catch(console.error);

		const controlsSub = merge(
			fromEvent(document, 'click'),
			fromEvent(document, 'keydown')
		)
			.pipe(throttleTime(500))
			.subscribe(function() {
				action()
					.catch(console.error);
			});

		onUnmounted(function() {
			controlsSub.unsubscribe();
			gameSub.unsubscribe();
			myPlayerSub.unsubscribe();
		});

		const showTitle = computed(function() {
			if (game.value === null) {
				return true;
			}

			if (myPlayer.value === null) {
				return true;
			}

			switch(game.value.state) {
				case GameState.WaitingPlayerA:
				case GameState.PlayerADisconnected:
				case GameState.PlayerBDisconnected:
					return true;
				case GameState.WaitingPlayerB:
					return myPlayer.value !== MyPlayer.PlayerA;
				default:
					return false;
			}
		});

		const aWins = computed(function() {
			if (game.value === null) {
				return false;
			}

			return game.value.state === GameState.AWins
				|| game.value.state === GameState.AWinsByFault;
		});

		const bWins = computed(function() {
			if (game.value === null) {
				return false;
			}

			return game.value.state === GameState.BWins
				|| game.value.state === GameState.BWinsByFault;
		});

		const indication = computed(function() {
			if (myPlayer.value === null) {
				return "";
			}

			if (game.value === null) {
				return "";
			}

			switch(game.value.state) {
				case GameState.WaitingPlayerB:
					return "Attende d'un deuxieme joueur";
				case GameState.Matte:
					switch(myPlayer.value) {
						case MyPlayer.PlayerA:
						case MyPlayer.PlayerB:
							return "Attendez...";
						default:
							return "";
					}
				case GameState.AWins:
					switch(myPlayer.value) {
						case MyPlayer.PlayerA:
							return "Vous gagnez !";
						case MyPlayer.PlayerB:
							return "Vous perdez !";
						default:
							return "";
					}
				case GameState.BWins:
					switch(myPlayer.value) {
						case MyPlayer.PlayerA:
							return "Vous perdez !";
						case MyPlayer.PlayerB:
							return "Vous gagnez !";
						default:
							return "";
					}
				case GameState.AWinsByFault:
					switch(myPlayer.value) {
						case MyPlayer.PlayerA:
							return "Gagné ! L'adversaire a frappé trop tôt !";
						case MyPlayer.PlayerB:
							return "Perdu ! vous frappez trop tôt !";
						default:
							return "";
					}
				case GameState.BWinsByFault:
					switch(myPlayer.value) {
						case MyPlayer.PlayerA:
							return "Perdu ! vous frappez trop tôt !";
						case MyPlayer.PlayerB:
							return "Gagné ! L'adversaire a frappé trop tôt !";
						default:
							return "";
					}
				default:
					return ""	
			}
		});

		return {
			myPlayer,
			game,
			GameState,
			MyPlayer,
			showTitle,
			aWins,
			bWins,
			disconnected,
			indication
		};
	},
	render
});

waitConnected
	.then(() =>	app.mount("body"))
	.catch(console.error);
