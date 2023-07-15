FROM node
WORKDIR /prince-duals/domains/player
COPY package.json .
COPY npm-shrinkwrap.json .
RUN npm install
RUN npm audit --audit-level=critical

FROM prince-duals-character
FROM prince-duals-game
FROM prince-duals-config
FROM prince-duals-ws-client

FROM node
COPY --from=0 /prince-duals/domains/player/node_modules /prince-duals/domains/player/node_modules
COPY --from=1 /prince-duals/models/character /prince-duals/models/character
COPY --from=2 /prince-duals/models/game /prince-duals/models/game
COPY --from=3 /prince-duals/lib/config /prince-duals/lib/config
COPY --from=4 /prince-duals/lib/ws-client /prince-duals/lib/ws-client

WORKDIR /prince-duals/domains/player
COPY . .
RUN npm run build
RUN npm prune --production
