import { ref, Ref, onUnmounted, computed } from "vue";
import { render } from "./template";
import { Game, GameState } from "game";
import { observeGame } from "player/async-api/observe-game";
import { observeMyCharacter } from "player/async-api/observe-my-character";
import { getGame } from "player/async-api/get-game";
import { getMyCharacter } from "player/async-api/get-my-character";
import { action } from "player/async-api/action";
import { fromEvent, throttleTime, merge } from "rxjs";
import { Character } from "character";
import { Connection } from "connection-types";
import { computeIndication } from "player/logic/compute-indication";
import { isTitleShown } from "player/logic/is-title-shown";
import { Message } from "player/async-api/message";

export const GameComponent = {
	props: {
		connection: Object
	},
	setup(props) {
		const connection: Connection<Message> = props.connection;
		const myCharacter: Ref<Character | null> = ref(null);
		const game: Ref<Game | null> = ref(null);
		const disconnected: Ref<boolean> = ref(false);

		const connexionSub = connection.messages$.subscribe({
			error: () => disconnected.value = true,
			complete: () => disconnected.value = true
		});
	
		const gameSub = observeGame(connection)
			.subscribe(value => game.value = value);

		const myCharacterSub = observeMyCharacter(connection)
			.subscribe(value => myCharacter.value = value);

		getGame(connection)
			.then(value => game.value = value)
			.catch(console.error);

		getMyCharacter(connection)
			.then(value => myCharacter.value = value)
			.catch(console.error);

		const controlsSub = merge(
			fromEvent(document, 'click'),
			fromEvent(document, 'keydown')
		)
			.pipe(throttleTime(500))
			.subscribe(function() {
				action(connection)
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
};
