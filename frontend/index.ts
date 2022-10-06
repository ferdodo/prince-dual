import { createApp, ref, Ref, onUnmounted, computed } from "vue";
import { render } from "./template";
import { Game, GameState } from "game";
import { waitConnected, waitDisconnected, send } from "ws-client";
import { observeGame } from "player/observe-game";
import { observeMyCharacter } from "player/observe-my-character";
import { getGame } from "player/get-game";
import { getMyCharacter } from "player/get-my-character";
import { action } from "player/action";
import { fromEvent, throttleTime, merge } from "rxjs";
import { Character } from "character";

setInterval(function keepAlive() {
	send({ eventType: "KEEP_ALIVE" })
		.catch(console.error);
}, 25000);

export const app = createApp({
	setup() {
		const myCharacter: Ref<Character | null> = ref(null);
		const game: Ref<Game | null> = ref(null);
		const disconnected: Ref<boolean> = ref(false);
	
		const gameSub = observeGame()
			.subscribe(value => game.value = value);

		const myCharacterSub = observeMyCharacter()
			.subscribe(value => myCharacter.value = value);

		getGame()
			.then(value => game.value = value)
			.catch(console.error);

		getMyCharacter()
			.then(value => myCharacter.value = value)
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
			myCharacterSub.unsubscribe();
		});

		const showTitle = computed(function() {
			if (game.value === null) {
				return true;
			}

			if (myCharacter.value === null) {
				return true;
			}

			switch(game.value.state) {
				case GameState.WaitingPlayerA:
				case GameState.PlayerADisconnected:
				case GameState.PlayerBDisconnected:
					return true;
				case GameState.WaitingPlayerB:
					return myCharacter.value !== Character.PlayerA;
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
			if (myCharacter.value === null) {
				return "";
			}

			if (game.value === null) {
				return "";
			}

			switch(game.value.state) {
				case GameState.WaitingPlayerB:
					return "Attente d'un deuxieme joueur";
				case GameState.Matte:
					switch(myCharacter.value) {
						case Character.PlayerA:
						case Character.PlayerB:
							return "Attendez...";
						default:
							return "";
					}
				case GameState.AWins:
					switch(myCharacter.value) {
						case Character.PlayerA:
							return "Vous gagnez !";
						case Character.PlayerB:
							return "Vous perdez !";
						default:
							return "";
					}
				case GameState.BWins:
					switch(myCharacter.value) {
						case Character.PlayerA:
							return "Vous perdez !";
						case Character.PlayerB:
							return "Vous gagnez !";
						default:
							return "";
					}
				case GameState.AWinsByFault:
					switch(myCharacter.value) {
						case Character.PlayerA:
							return "Gagné ! L'adversaire a frappé trop tôt !";
						case Character.PlayerB:
							return "Perdu ! vous frappez trop tôt !";
						default:
							return "";
					}
				case GameState.BWinsByFault:
					switch(myCharacter.value) {
						case Character.PlayerA:
							return "Perdu ! vous frappez trop tôt !";
						case Character.PlayerB:
							return "Gagné ! L'adversaire a frappé trop tôt !";
						default:
							return "";
					}
				default:
					return ""	
			}
		});

		return {
			myCharacter,
			game,
			GameState,
			Character,
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
