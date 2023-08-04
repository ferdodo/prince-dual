<script>
	import {
		isTabServer,
		tabIsServer$,
		connectionState$,
		getConnectionState,
		ConnectionState,
	} from "offline";

	import { OFFLINE_MODE } from "config";

	let tabIsServer = isTabServer();
	tabIsServer$.subscribe(value => tabIsServer = value);
	let connectionState = getConnectionState();
	connectionState$.subscribe(value => connectionState = value);
</script>

<div>
	<h3> Connection Status </h3>

	{#if OFFLINE_MODE}
		<p title="Test the game using multiple tabs.">
			📴 local multiplayer mode
		</p>
	{/if}

	{#if connectionState === ConnectionState.Connected}
		<p> { tabIsServer ? "🌐 Server" : "🔗 Client"} </p>
	{/if}

	<p> { connectionState } </p>
</div>

<style>
	div {
		padding: 0.1rem;
		padding-left: 1rem;
		background-color: white;
	}
</style>
