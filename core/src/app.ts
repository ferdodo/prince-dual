import { Playground, ManualRtc, appContext, Context } from "core";
import { html } from "htm/preact";

export function App(context: Context, dataTestid?: string) {
	return html`
		<${appContext.Provider} value=${context}>
			<${ManualRtc}/>
			<${Playground} dataTestid=${dataTestid}/>
		<//>
	`;
}
