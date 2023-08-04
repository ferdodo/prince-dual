SVELTES_COMPONENTS = $(wildcard ./components/*.svelte)

DIST_SVELTE_TEMPLATE = $(SVELTES_COMPONENTS:.svelte=.js)

all: $(DIST_SVELTE_TEMPLATE)

%.js: %.svelte
	npx --no-install svelte-compiler --infile $^ --outfile $@
