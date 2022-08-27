import { Observable } from "rxjs";
import { Game, GameState } from ".";
import { EventEmitter } from 'node:events';

let game = {
	state: GameState.WaitingPlayerA
};

const gameEventEmitter = new EventEmitter();

export function readGame(): Game {
	return { ...game };
}

export function saveGame(update: Partial<Game>) {
	game = { ...game, ...update };
	gameEventEmitter.emit('update', game);
}

export function watchGame(): Observable<Game> {
	return new Observable(function(subscriber) {
		gameEventEmitter.on('update', function(game: Game) {
			subscriber.next(game);
		});
	});
}
