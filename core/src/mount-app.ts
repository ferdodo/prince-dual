import { App, type Context } from "core";
import { render } from "htm/preact";

export function mountApp(
	htmlElement: HTMLElement,
	context: Context
) {
	render(App(context), htmlElement);
}
