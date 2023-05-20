#!/usr/bin/env zx
import { hideBin } from 'yargs/helpers';
import { runTask } from "zx-run-task";
import yargs from "yargs";

function getOptions() {
	const args = hideBin(process.argv);

	return yargs(args)
		.usage("$0", "Prince duals build")
		.options({
			"web-protocol": {
				type: "string",
				choices: ["http", "https"],
				demandOption: true
			},
			"domain": {
				type: "string",
				demandOption: true
			},
			"web-port": {
				type: "number",
				demandOption: true
			},
			"ws-protocol": {
				type: "string",
				choices: ["ws", "wss"],
				demandOption: true
			},
			"ws-port": {
				type: "number",
				demandOption: true
			},
		})
		.parse();
}

const options = getOptions();

await runTask("Transpile constants", $`
	npx --no-install esbuild constants.ts \
		--define:PRINCE_DUALS_WEB_PROTOCOL=${ JSON.stringify(options.webProtocol) } \
		--define:PRINCE_DUALS_WEB_DOMAIN=${ JSON.stringify(options.domain) } \
		--define:PRINCE_DUALS_WEB_PORT=${ options.webPort } \
		--define:PRINCE_DUALS_WS_PORT=${ options.wsPort } \
		--define:PRINCE_DUALS_WS_PROTOCOL=${ JSON.stringify(options.wsProtocol) } \
		--outfile=dist/constants.js \
`);

await runTask("Transpile test", $`
	npx --no-install esbuild constants.test.ts \
		--platform=node \
		--bundle \
		--sourcemap \
		--outfile=constants.test.js \
`);

await runTask("Run test", $`node --enable-source-maps constants.test.js`);

