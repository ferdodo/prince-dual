<script lang="ts">
	import { outcomingSignaling$, broadcastIncomingSignaling, defaultContextId, Context, Character } from "core";
	import { getContext } from "svelte";

	let receivedSignalingEvents;
	let signalingEvents = [];
	const context = getContext(defaultContextId) as Context;
	const config = context.configStorage.read();
	let offlineModeCharacter = config.offlineModeCharacter;
	$: context.configStorage.save({ offlineModeCharacter });
	let manualRtcCompleted = false;

	function updateStunServer(event) {
		context.configStorage.save({ stunServer: (event.target.value as string) });
	}

	outcomingSignaling$.subscribe(signalingEvent => signalingEvents = [...signalingEvents, signalingEvent]);

	async function receiveSignalingEvents() {
		setTimeout(function() {
			broadcastIncomingSignaling(JSON.parse(receivedSignalingEvents));
			receivedSignalingEvents = undefined;

			if (offlineModeCharacter === Character.PlayerA) {
				manualRtcCompleted = true;
			}
		}, 10);
	}

	function copySignalingEventToClipBoard() {
		navigator.clipboard.writeText(JSON.stringify(signalingEvents, null, 4));
		signalingEvents = [];

		if (offlineModeCharacter === Character.PlayerB) {
			manualRtcCompleted = true;
		}
	}
</script>

{#if !manualRtcCompleted}
	<div style="background-color: white;">
		<fieldset>
			<legend> Connexion WebRTC </legend>

			{#if offlineModeCharacter === Character.None}

				<fieldset>
					<legend> Serveur STUN (Si connexion via internet) </legend>
					<input placeholder="stun:<serveur>:<port>" on:change={updateStunServer}/>
				</fieldset>

				<fieldset>
					<legend> Choix de votre joueur </legend>
					<button on:click={() => offlineModeCharacter = Character.PlayerA}> Joueur 1 </button>
					<button on:click={() => offlineModeCharacter = Character.PlayerB}> Joueur 2 </button>
				</fieldset>

			{/if}

			{#if offlineModeCharacter !== Character.None}
				{#if signalingEvents.length}
					<div class="container">
						<button on:click={copySignalingEventToClipBoard} style="width: 10rem;">
							Copier mon signalement (⚠️&nbsp;CONFIDENTIEL&nbsp;⚠️, Adresse IP, routage réseau, ...)
						</button>
					</div>
				{/if}

				<textarea
					placeholder="Recevoir le signalement de l'autre joueur."
					on:paste={receiveSignalingEvents}
					bind:value={receivedSignalingEvents}
					style="width: 10rem;"
				/> 
			{/if}
		</fieldset>
	</div>
{/if}

<style>
	fieldset {
		display: inline;
		margin: 0.2rem;
	}
</style>