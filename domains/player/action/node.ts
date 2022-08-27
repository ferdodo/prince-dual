import { Connexion } from "ws-server";
import { Observable, filter, Subscription } from "rxjs";
import { Game, GameState } from "game";
import { readGame, saveGame } from "game/node";
import { filterMessage } from "./model";

const {
	WaitingPlayerA,
	WaitingPlayerB,
	Matte,
	Hajime,
	AWins,
	BWins,
	AWinsByFault,
	BWinsByFault,
	PlayerADisconnected,
	PlayerBDisconnected
} = GameState;

let hajimeTimeout;

export function action(connexions$: Observable<Connexion>): Subscription {
	return connexions$.subscribe(function(connexion: Connexion) {
		const messageSub = connexion.messages$.pipe(filter(filterMessage))
			.subscribe({
				next() {
					const game: Game = readGame();

					switch(game.state) {
						case AWins:
						case BWins:
						case AWinsByFault:
						case BWinsByFault:
							game.state = WaitingPlayerA;
							game.playerA = undefined;
							game.playerB = undefined;
							break;
						case PlayerADisconnected:
						case PlayerBDisconnected:
						case WaitingPlayerA:
							game.playerA = connexion.id;
							game.state = WaitingPlayerB;
							break;
						case WaitingPlayerB:
							if (game.playerA !== connexion.id) {
								game.playerB = connexion.id;
								game.state = Matte;

								hajimeTimeout = setTimeout(function() {
									game.state = Hajime;
									saveGame(game);
								}, 2000 + Math.random() * 4000);
							} else {
								return;
							}

							break;
						case Matte:
							if (connexion.id === game.playerA) {
								clearTimeout(hajimeTimeout);
								game.state = BWinsByFault;
							} else if (connexion.id === game.playerB) {
								clearTimeout(hajimeTimeout);
								game.state = AWinsByFault;
							}

							break;
						case Hajime:
							if (connexion.id === game.playerA) {
								game.state = AWins;
							} else if (connexion.id === game.playerB) {
								game.state = BWins;
							}

							break;
						default:
							return;
					}

					saveGame(game);
				},
				complete() {
					const game: Game = readGame();

					switch(connexion.id) {
						case game.playerA:
							game.playerA = undefined;
							game.playerB = undefined;
							game.state = PlayerADisconnected;
							break;
						case game.playerB:
							game.playerA = undefined;
							game.playerB = undefined;
							game.state = PlayerBDisconnected;
							break;
						default:
							return;
					}

					saveGame(game);
					messageSub.unsubscribe();
				}
			});
	});
}
