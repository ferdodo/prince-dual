FROM node
WORKDIR /prince-duals/domains/user
COPY package.json .
COPY npm-shrinkwrap.json .
RUN npm install
RUN npm audit --audit-level=critical

FROM prince-duals-offline
FROM prince-duals-ws-client
FROM prince-duals-svelte-compiler-cli
FROM prince-duals-config

FROM node
COPY --from=0 /prince-duals/domains/user/node_modules /prince-duals/domains/user/node_modules
COPY --from=1 /prince-duals/lib/offline /prince-duals/lib/offline
COPY --from=2 /prince-duals/lib/ws-client /prince-duals/lib/ws-client
COPY --from=3 /prince-duals/lib/svelte-compiler-cli /prince-duals/lib/svelte-compiler-cli
COPY --from=4 /prince-duals/lib/config /prince-duals/lib/config

WORKDIR /prince-duals/domains/user
COPY . .
RUN npm install ../../lib/svelte-compiler-cli
RUN npm run build
RUN npm prune --production
