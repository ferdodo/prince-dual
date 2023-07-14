import { createApp, ref, Ref, onUnmounted, computed } from "vue";
import { render } from "./template";
import { Game, GameState } from "game";
import { createConnexion } from "client";
import { observeGame } from "player/async-api/observe-game";
import { observeMyCharacter } from "player/async-api/observe-my-character";
import { getGame } from "player/async-api/get-game";
import { getMyCharacter } from "player/async-api/get-my-character";
import { action } from "player/async-api/action";
import { fromEvent, throttleTime, merge } from "rxjs";
import { Character } from "character";
import { Connexion } from "link";
import { computeIndication } from "player/logic/compute-indication";
import { isTitleShown } from "player/logic/is-title-shown";

export const app = createApp({
	setup() {
		const myCharacter: Ref<Character | null> = ref(null);
		const game: Ref<Game | null> = ref(null);
		const disconnected: Ref<boolean> = ref(false);
		const connexion: Connexion = createConnexion();

		const connexionSub = connexion.messages$.subscribe({
			error: () => disconnected.value = true,
			complete: () => disconnected.value = true
		});
	
		const gameSub = observeGame(connexion)
			.subscribe(value => game.value = value);

		const myCharacterSub = observeMyCharacter(connexion)
			.subscribe(value => myCharacter.value = value);

		getGame(connexion)
			.then(value => game.value = value)
			.catch(console.error);

		getMyCharacter(connexion)
			.then(value => myCharacter.value = value)
			.catch(console.error);

		const controlsSub = merge(
			fromEvent(document, 'click'),
			fromEvent(document, 'keydown')
		)
			.pipe(throttleTime(500))
			.subscribe(function() {
				action(connexion)
					.catch(console.error);
			});

		onUnmounted(function() {
			controlsSub.unsubscribe();
			gameSub.unsubscribe();
			myCharacterSub.unsubscribe();
			connexionSub.unsubscribe();
		});

		const showTitle = computed(() => isTitleShown(myCharacter.value, game.value));

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

		const indication = computed(() => computeIndication(myCharacter.value, game.value));
		
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

app.mount("body");
