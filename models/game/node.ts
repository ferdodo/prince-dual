import { Observable, Subject } from "rxjs";
import { Game, GameState } from ".";

let game: Game = {
	state: GameState.WaitingPlayerA
};

const gameUpdates$ = new Subject<Game>();

export function readGame(): Game {
	return { ...game };
}

export function saveGame(update: Partial<Game>) {
	game = { ...game, ...update };
	gameUpdates$.next(game);
}

export function watchGame(): Observable<Game> {
	return gameUpdates$.asObservable();
}
