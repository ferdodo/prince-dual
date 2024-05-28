import type { Context } from "core/types";
import { Playground, ManualRtc, appContext } from "core";
import { html } from "htm/preact";

export function App(context: Context) {
	return html`
		<${appContext.Provider} value=${context}>
			<${ManualRtc}/>
			<${Playground}/>
		<//>
	`;
}
