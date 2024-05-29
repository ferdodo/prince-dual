export default {
	root: "./public",
	resolve: {
		alias: {
			"/bundle.js": "../src/index.ts"
		}
	},
	build: {
		sourcemap: true
	}
};
