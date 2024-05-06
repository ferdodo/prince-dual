SOURCES = $(wildcard src/*.svelte)
TARGETS = $(SOURCES:src/%.svelte=src/%.svelte.js)
all: $(TARGETS)

src/%.svelte.js: src/%.svelte
	npx --no-install svelte-compiler-cli --infile $^ --outfile=$@
	rm $^
