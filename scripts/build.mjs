#!/usr/bin/env zx
import shell from "shelljs";
import assert from "assert/strict";
import Spinnies from "spinnies";
import { hideBin } from 'yargs/helpers';
import yargs from "yargs";

const { find, cp, mkdir } = shell;
const spinnies = new Spinnies();

function getOptions(){
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

async function runCommand(description, processOutput) {
	if (process.stdout.isTTY) {
		spinnies.add(description);
	} else {
		console.log(`         ${ description }...`);
	}

	processOutput.quiet();

	try {
		await processOutput;

		if (process.stdout.isTTY) {
			spinnies.succeed(description);
		} else {
			console.log(`[  OK  ] ${ description }.`);
		}
	} catch(error) {
		if (process.stdout.isTTY) {
			spinnies.fail(description);
		} else {
			console.log(`[FAILED] ${ description } !`);
		}

		process.stdout.write(error.stdout);
		process.stderr.write(error.stderr);
		throw error;
	}
}

function copyStatic() {
	mkdir('-p', 'frontend/dist');
	cp('frontend/static/*', 'frontend/dist');
	return Promise.resolve();
}

async function bundleBackend() {
	await runCommand('Bundle backend', $`
		npx --no-install esbuild backend/index.ts \
			--bundle \
			--platform=node \
			--outfile=backend/dist/main.js
	`);
}

async function checkBackendTypings() {
	await runCommand("Check backend typings", $`npx --no-install tsc --project backend`);
}

async function buildVueTemplates() {
	const templates = find('frontend')
		.filter(file => !file.includes('/static'))
		.filter(file => !file.includes('/dist'))
		.filter(file => file.match(/\.html$/));

	function outfile(fileName) {
		return fileName.replace(/\.html$/, '.js');
	}

	async function buildTemplates(infile, outfile) {
		await runCommand(`Building vue.js template ${ infile }`, $`
			npx --no-install vue-compiler-dom-cli \
				--infile ${ infile } \
				--outfile ${ outfile } \
				--mode module
		`);
	}

	for (const template of templates) {
		await buildTemplates(template, outfile(template));
	}
}

async function bundleFrontend(options) {
	await runCommand("Bundle frontend", $`
		npx --no-install esbuild --bundle frontend/index.ts \
			--define:__VUE_OPTIONS_API__=false \
			--define:__VUE_PROD_DEVTOOLS__=false \
			--define:PRINCE_DUALS_WEB_PROTOCOL=${ JSON.stringify(options.webProtocol) } \
			--define:PRINCE_DUALS_WEB_DOMAIN=${ JSON.stringify(options.domain) } \
			--define:PRINCE_DUALS_WEB_PORT=${ options.webPort } \
			--define:PRINCE_DUALS_WS_PORT=${ options.wsPort } \
			--define:PRINCE_DUALS_WS_PROTOCOL=${ JSON.stringify(options.wsProtocol) } \
			--target=chrome80 \
			--outfile=frontend/dist/bundle.js \
			--minify \
			--tree-shaking=true \
			--sourcemap
	`);
}

async function checkFrontendTypings() {
	await runCommand("Checking frontend typings", $`npx --no-install tsc --project frontend`);
}

async function lintTypescriptFiles() {
	await runCommand('Linting code', $`
		npx --no-install eslint \
			--max-warnings 0 \
			--parser @typescript-eslint/parser \
			--plugin @typescript-eslint/tslint \
			--config eslintrc.yml \
			--ext .ts .
	`);
}

const options = await getOptions();

await Promise.all([
	bundleBackend(),
	checkBackendTypings(),
	copyStatic(),
	buildVueTemplates()
		.then(() => Promise.all([
			bundleFrontend(options),
			lintTypescriptFiles(),
			checkFrontendTypings()
		]))
]);
