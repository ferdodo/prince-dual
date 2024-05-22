<script lang="ts">
	import { Connection } from "connection-types";
	import { Subject, throttleTime, merge, combineLatest, from } from "rxjs";
	import { onDestroy, getContext } from "svelte";

	import {
		computeIndication,
		Message,
		observeGame,
		Character,
		Game,
		observeMyCharacter,
		getGame,
		getMyCharacter,
		interact,
		isTitleShown,
		GameState,
		Context,
		defaultContextId,
		createClientConnection
	} from "core";

	export let contextId = defaultContextId;
	export let dataTestid = undefined;

	const context = getContext(contextId) as Context;
	const waitConnection: Promise<Connection<Message>> = createClientConnection(context);
	let myCharacter: Character | null = null;
	let game: Game | null = null;
	let disconnected: boolean = false;
	$: showTitle = isTitleShown(myCharacter, game);
	$: aWins = game !== null && (game.state === GameState.AWins || game.state === GameState.AWinsByFault)
	$: bWins = game !== null && (game.state === GameState.BWins || game.state === GameState.BWinsByFault)
	$: indication = computeIndication(myCharacter, game);

	let sub;
	let connexionSub;
	let controlsSub;

	waitConnection.then(function(connection) {
		sub = combineLatest(
			merge(
				from(getGame(connection)),
				observeGame(connection)
			),
			merge(
				from(getMyCharacter(connection)),
				observeMyCharacter(connection)
			)
		)
			.pipe(throttleTime(15, undefined,{ leading: true, trailing: true }))
			.subscribe(function([_game, _myCharacter]) {
				game = _game;
				myCharacter = _myCharacter;
			});

		connexionSub = connection.messages$.subscribe({
			error: () => disconnected = true,
			complete: () => disconnected = true
		});


		controlsSub = interaction$
			.subscribe(function() {
				if (game) {
					interact(connection)
						.catch(console.error);
				}
			});
	})

	const interaction$ = new Subject();

	onDestroy(function() {
		sub?.unsubscribe();
		connexionSub?.unsubscribe();
		controlsSub?.unsubscribe();
	});
</script>

<div
	class="main"
	data-testid={dataTestid}
	on:click={() => interaction$.next(undefined) }
	on:keydown={() => interaction$.next(undefined) }
>
	{#if disconnected} <p class="disconnectedFromServer">Disconnected from server.</p> {/if}
	{#if !disconnected && !game} <p class="disconnectedFromServer">Attente d'une connexion.</p> {/if}
	{#if showTitle && game} <div aria-label="title" class="title"></div> {/if}

	{#if !showTitle}
		<div aria-label="arena" class="arena"> 
			<div aria-label="player" class="vue-player">
				{#if game.playerA && !aWins && !bWins} <div aria-label="playerA" class="playerA"></div> {/if}
				{#if game.playerB && !aWins && !bWins} <div aria-label="playerB" class="playerB"></div> {/if}
				{#if game.playerA && aWins} <div class="playerAwins"></div> {/if}
				{#if game.playerB && aWins} <div class="playerBloses"></div> {/if}
				{#if game.playerA && bWins} <div class="playerAloses"></div> {/if}
				{#if game.playerB && bWins} <div class="playerBwins"></div> {/if}
			</div>

			{#if game.state === GameState.Hajime} <p aria-label="exclamationPoints" class="exclamationPoints">!!</p> {/if}
			{#if myCharacter === Character.PlayerA} <p class="playerADisplay">Joueur 1</p> {/if}
			{#if myCharacter === Character.PlayerB} <p class="playerBDisplay">Joueur 2</p> {/if}
			{#if myCharacter === Character.None} <p class="spectatorDisplay">Spectateur</p> {/if}
			<p aria-label="indication" class="indication"> { indication } </p>
		</div>
	{/if}
</div>
