import { test, expect } from "vitest";
import { render, screen, within, fireEvent } from "@testing-library/preact";
import { uid } from "uid";
import { merge } from "rxjs";
import { App, ContextFactory, GameState, createGameStorage, initiateBackendHandlers } from "core";

test("should run a game in online mode", async function() {
	const contextFactoryP1 = new ContextFactory();
	const contextFactoryP2 = new ContextFactory();
	const contextP1 = contextFactoryP1.build();
	const contextP2 = contextFactoryP2.build();
	const gameStorage = createGameStorage();
	const serverConnections$ = merge(contextFactoryP1.serverConnexion$, contextFactoryP2.serverConnexion$);
	initiateBackendHandlers(gameStorage, serverConnections$);
	const dataTestidP1 = uid() + "-player1";
	const dataTestidP2 = uid() + "-player2";
	render(App(contextP1, dataTestidP1));
	render(App(contextP2, dataTestidP2));
	let game = gameStorage.read();
	expect(game.state).toEqual(GameState.WaitingPlayerA);
	const componentP1 = screen.getByTestId(dataTestidP1);
	const componentP2 = screen.getByTestId(dataTestidP2);
	await within(componentP1).findByLabelText("title");
	await within(componentP2).findByLabelText("title");
	fireEvent.click(componentP1);
	const arenaA = await within(componentP1).findByLabelText("arena");
	game = gameStorage.read();
	expect(game.state).toEqual(GameState.WaitingPlayerB);
	await within(arenaA).findByText("Attente d'un deuxieme joueur");
	fireEvent.click(componentP2);
	const arenaB = await within(componentP2).findByLabelText("arena");
	game = gameStorage.read();
	expect(game.state).toEqual(GameState.Matte);
	await within(arenaA).findByText("Attendez...");
	await within(arenaB).findByText("Attendez...");
	gameStorage.save({ state: GameState.Hajime });
	await within(arenaA).findByLabelText("exclamationPoints");
	await within(arenaB).findByLabelText("exclamationPoints");
	game = gameStorage.read();
	expect(game.state).toEqual(GameState.Hajime);
	fireEvent.click(screen.getByTestId(dataTestidP1));
	await within(arenaA).findByText("Vous gagnez !");
	await within(arenaB).findByText("Vous perdez !");
	game = gameStorage.read();
	expect(game.state).toEqual(GameState.AWins);
});

test("should run a game in offline mode", async function() {
	const contextFactoryP1 = new ContextFactory();
	const contextFactoryP2 = new ContextFactory();
	contextFactoryP1.setOffline();
	contextFactoryP2.setOffline();
	const contextP1 = contextFactoryP1.build();
	const contextP2 = contextFactoryP2.build();
	const dataTestidP1 = uid() + "-player1";
	const dataTestidP2 = uid() + "-player2";
	render(App(contextP1, dataTestidP1));
	render(App(contextP2, dataTestidP2));
	const componentP1 = screen.getByTestId(dataTestidP1);
	const componentP2 = screen.getByTestId(dataTestidP2);
	await within(componentP1).findByLabelText("title");
	await within(componentP2).findByLabelText("title");
	const gameStorage = contextP1.offlineModeGameStorage;

	if (!gameStorage) {
		throw new Error("GameStorage not found !");
	}

	let game = gameStorage.read();
	expect(game.state).toEqual(GameState.WaitingPlayerA);

	fireEvent.click(componentP1);
	const arenaA = await within(componentP1).findByLabelText("arena");
	game = gameStorage.read();
	expect(game.state).toEqual(GameState.WaitingPlayerB);
	await within(arenaA).findByText("Attente d'un deuxieme joueur");

	fireEvent.click(componentP2);
	const arenaB = await within(componentP2).findByLabelText("arena");
	game = gameStorage.read();
	expect(game.state).toEqual(GameState.Matte);
	await within(arenaA).findByText("Attendez...");
	await within(arenaB).findByText("Attendez...");

	gameStorage.save({ state: GameState.Hajime });
	await within(arenaA).findByLabelText("exclamationPoints");
	await within(arenaB).findByLabelText("exclamationPoints");
	game = gameStorage.read();
	expect(game.state).toEqual(GameState.Hajime);

	fireEvent.click(screen.getByTestId(dataTestidP1));
	await within(arenaA).findByText("Vous gagnez !");
	await within(arenaB).findByText("Vous perdez !");
	game = gameStorage.read();
	expect(game.state).toEqual(GameState.AWins);
});
