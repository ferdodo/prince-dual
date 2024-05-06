import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({mode}) => ({
	plugins: [
		tsconfigPaths(),
		svelte()
	],
	test: {
		environment: 'jsdom',
		alias: [{
			find: /^svelte$/,
			replacement: 'svelte/internal'
		}]
	}
}));
