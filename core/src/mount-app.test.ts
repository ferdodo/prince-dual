import { test, expect } from "vitest";
import { mountApp, ContextFactory } from "core";
import { render, screen } from "@testing-library/preact";
import { html } from "htm/preact";
import { uid } from "uid";

test("should mount the app", async function() {
    const id = uid();
    render(html`<div data-testid=${ id }></div>`);
    const appMountingPoint = screen.getByTestId(id);
    const contextFactory = new ContextFactory();
    const context = contextFactory.build();
    await mountApp(appMountingPoint, context);
    const rendered = screen.getByTestId(id);
    expect(rendered.innerHTML).not.toEqual("");
});