import {
	outcomingSignaling$,
	broadcastIncomingSignaling,
	Context,
	appContext,
	Character
} from "core";

import { html } from "htm/preact";
import { useContext, useEffect, useState, useMemo } from "preact/hooks";
import { css } from "goober";

export function ManualRtc({ dataTestid }) {
	let [receivedSignalingEvents, setReceivedSignalingEvents] = useState("");
	let [signalingEvents, setSignalingEvents] = useState([]);
	const context: Context = useContext(appContext);
	let [config, setConfig] = useState(context.configStorage.read());
	let sub = useMemo(() => context.configStorage.watch().subscribe(setConfig), []);
	let [manualRtcCompleted, setManualRtcCompleted] = useState(false);

	function updateOfflineModeCharacter(offlineModeCharacter: Character) {
		context.configStorage.save({ offlineModeCharacter });
	}

	function updateStunServer(event) {
		context.configStorage.save({ stunServer: (event.target.value as string) });
	}

	const sub2 = useMemo(function() {
		return outcomingSignaling$.subscribe(function(signalingEvent) {
			signalingEvents.push(signalingEvent)
			setSignalingEvents([...signalingEvents]);
		});
	}, []);

	async function receiveSignalingEvents(event) {
		broadcastIncomingSignaling(JSON.parse(event.target.value));
		setReceivedSignalingEvents("");

		if (config.offlineModeCharacter === Character.PlayerA) {
			setManualRtcCompleted(true);
		}
	}

	function copySignalingEventToClipBoard() {
		navigator.clipboard.writeText(JSON.stringify(signalingEvents, null, 4));
		setSignalingEvents([]);

		if (config.offlineModeCharacter === Character.PlayerB) {
			setManualRtcCompleted(true);
		}
	}

	useEffect(() => {
		return function() {
			console.log("unsibscribing from ManualRtc component.")
			sub.unsubscribe();
			sub2.unsubscribe();
		};
	}, []);

	const className = css`
		background-color: white;

		& fieldset {
			display: inline;
			margin: 0.2rem;
		}
	`;

	return !manualRtcCompleted && html`
		<div className=${className} data-testid=${dataTestid}>
			<fieldset>
				<legend> Connexion WebRTC </legend>

				${config.offlineModeCharacter === Character.None ? html`
					<fieldset>
						<legend> Serveur STUN (Si connexion via internet) </legend>
						<input placeholder="stun:<serveur>:<port>" onChange=${updateStunServer}/>
					</fieldset>

					<fieldset>
						<legend> Choix de votre joueur </legend>

						<button
							aria-label="player1Button"
							onClick=${() => updateOfflineModeCharacter(Character.PlayerA)}>
							Joueur 1
						</button>
						<button
							aria-label="player2Button"
							onClick=${() => updateOfflineModeCharacter(Character.PlayerB)}>
							Joueur 2
						</button>
					</fieldset>
				` : null}

				${config.offlineModeCharacter !== Character.None ? html`
					${signalingEvents.length ? html`
						<div>
							<button
								onClick=${copySignalingEventToClipBoard}
								aria-label="copySignalingEventToClipBoard"
								style="width: 10rem;">
								Copier mon signalement (⚠️&nbsp;CONFIDENTIEL&nbsp;⚠️,
								Adresse IP, routage réseau, ...)
							</button>
						</div>
					` : null}

					<textarea
						placeholder="Recevoir le signalement de l'autre joueur."
						aria-label="signalingEvents"
						onChange=${receiveSignalingEvents}
						value=${receivedSignalingEvents}
						style="width: 10rem;"
					></textarea>
				` : null}
			</fieldset>
		</div>
	`;
}