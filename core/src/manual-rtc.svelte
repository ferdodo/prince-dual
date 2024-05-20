<script lang="ts">
	import { SignalingEvent } from "core";

	let peerConnection;
	let offer;
	let answer;
	let connectionState;
	let iceCandidates = [];
	let receivedSignalingEvents;
	let sendChannel;
	let type;

	function acceptConnection() {
		type = "b";

		if (peerConnection) {
			peerConnection.close();
		}

		offer = undefined;
		answer = undefined;
		connectionState = undefined;
		iceCandidates = [];
		sendChannel = undefined;
		peerConnection = new RTCPeerConnection();

		peerConnection.addEventListener("connectionstatechange", function() {
			connectionState = peerConnection.connectionState;
		});

		peerConnection.onicecandidate = (event) => {
			const candidate = event?.candidate?.toJSON();

			if (candidate) {
				iceCandidates = [...iceCandidates, candidate];
			}
		}
	}

	async function initiateConnection() {
		type = "a";

		if (peerConnection) {
			peerConnection.close();
		}

		offer = undefined;
		answer = undefined;
		connectionState = undefined;
		iceCandidates = [];
		sendChannel = undefined;

		peerConnection = new RTCPeerConnection();

		peerConnection.onicecandidate = (event) => {
			const candidate = event?.candidate?.toJSON();

			if (candidate) {
				iceCandidates = [...iceCandidates, candidate];
			}
		}

		peerConnection.addEventListener("connectionstatechange", function() {
			connectionState = peerConnection.connectionState;
		});

		sendChannel = peerConnection.createDataChannel('sendDataChannel');
		offer = await peerConnection.createOffer();
		await peerConnection.setLocalDescription(offer);
	}

	async function receiveSignalingEvents() {
		for (const signalingEvent of JSON.parse(receivedSignalingEvents)) {
			if (type === "b" && !answer && signalingEvent.offer) {
				await peerConnection.setRemoteDescription(signalingEvent.offer);
			}

			if (type === "a" && signalingEvent.answer) {
				await peerConnection.setRemoteDescription(signalingEvent.answer);
			}
		}

		for (const signalingEvent of JSON.parse(receivedSignalingEvents)) {
			if (signalingEvent.candidate) {
				await peerConnection.addIceCandidate(signalingEvent.candidate);
			}

			if (type === "b" && !answer && signalingEvent.offer) {
				answer = await peerConnection.createAnswer();
				await peerConnection.setLocalDescription(answer);
			}
		}

		receivedSignalingEvents = undefined;
	}

	function createSignalingEvents(): SignalingEvent[] {
		const signalingEvents = [
			...iceCandidates.map(candidate => ({ candidate })),
			...offer ? [{ offer }] : [],
			...answer ? [{ answer }] : []
		];

		offer = undefined;
		answer = undefined;
		iceCandidates = [];

		return signalingEvents;
	}

	function copySignalingEventToClipBoard() {
		const signalingEvents = createSignalingEvents();
		navigator.clipboard.writeText(JSON.stringify(signalingEvents, null, 4));
	}
</script>

<div style="background-color: white;">
	<h1> Connexion RTC manuelle ({connectionState}) </h1>

	{#if !type}
		<div class="container">
			<button on:click={initiateConnection}> Initier la connexion WebRTC </button>
			<button on:click={acceptConnection}> Accepter la connextion WebRTC </button>
		</div>
	{/if}

	{#if offer || answer || iceCandidates.length}
		<div class="container">
			<button on:click={copySignalingEventToClipBoard}> Copier le message de signalement </button>
		</div>
	{/if}

	{#if type && connectionState !== "connected"}
		<div class="container">
			<textarea
				placeholder="Recevoir un message du partenaire."
				on:change={receiveSignalingEvents}
				bind:value={ receivedSignalingEvents }
			/> 
		</div>
	{/if}
</div>

<style>
	.container {
		padding: 1rem;
		border: 1px solid black;
		margin: 1rem;
	}
</style>