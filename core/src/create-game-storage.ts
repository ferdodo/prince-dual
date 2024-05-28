import type { GameStorage, Game } from "core/types";
import { GameState } from "core";
import { Subject } from "rxjs";

export function createGameStorage(): GameStorage {
	let game: Game = {
		state: GameState.WaitingPlayerA
	};

	const _game$: Subject<Game> = new Subject();

	return {
		read() {
			return { ...game };
		},
		save(update: Partial<Game>) {
			game = {
				...game,
				...update
			};

			_game$.next(game);
		},
		watch() {
			return _game$.asObservable();
		}
	};
}
