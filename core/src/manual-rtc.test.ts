import { test } from "vitest";
import { render, screen, within, fireEvent } from "@testing-library/preact";
import { uid } from "uid";
import { firstValueFrom, timeout, filter } from "rxjs";
import { html } from "htm/preact";

import {
    ContextFactory,
    broadcastOutcomingSignaling,
    SignalingEvent,
    ManualRtc,
    appContext,
    incomingSignaling$
} from "core";

test("pasting a signaling event from other player should emit a signaling event", async function() {
	const contextFactory = new ContextFactory();
	const context = contextFactory.build();
    const dataTestid = uid();
    const signalingId = uid();
    const signalingEvent: SignalingEvent[] = [{ id: signalingId }];

    const waitIncomingSignaling = firstValueFrom(
        incomingSignaling$.pipe(
            filter(signaling => signaling.some(event => event.id === signalingId)),
            timeout(1000),
        )
    );

	render(html`
		<${appContext.Provider} value=${context}>
			<${ManualRtc} dataTestid=${dataTestid}/>
		<//>
	`);

    const component = screen.getByTestId(dataTestid);
    const player2Button = within(component).getByLabelText("player2Button");
    fireEvent.click(player2Button);
    const signalingEventInput = within(component).getByLabelText("signalingEvents");
    fireEvent.change(signalingEventInput, { target: { value: JSON.stringify(signalingEvent) } });
    await waitIncomingSignaling;
});

test("Emiting an outcoming event should display a signaling event for the user to copy", async function() {
	const contextFactory = new ContextFactory();
	const context = contextFactory.build();
    const dataTestid = uid();
    const signalingEvent: SignalingEvent = {};

	render(html`
		<${appContext.Provider} value=${context}>
			<${ManualRtc} dataTestid=${dataTestid}/>
		<//>
	`);

    const component = screen.getByTestId(dataTestid);
    const player1Button = within(component).getByLabelText("player1Button");
    fireEvent.click(player1Button);
    broadcastOutcomingSignaling(signalingEvent);
    await within(component).findByLabelText("copySignalingEventToClipBoard");
});