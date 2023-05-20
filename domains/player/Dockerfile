FROM prince-duals-ws-server
FROM prince-duals-character
FROM prince-duals-game
FROM prince-duals-ws-client
FROM prince-duals-config

FROM node
COPY --from=0 /prince-duals/lib/ws-server /prince-duals/lib/ws-server
COPY --from=1 /prince-duals/models/character /prince-duals/models/character
COPY --from=2 /prince-duals/models/game /prince-duals/models/game
COPY --from=3 /prince-duals/lib/ws-client /prince-duals/lib/ws-client
COPY --from=4 /prince-duals/lib/config /prince-duals/lib/config
WORKDIR /prince-duals/domains/player
COPY package.json .
COPY npm-shrinkwrap.json .
RUN npm install
RUN npm audit --audit-level=critical
COPY . .
RUN npm run build
#RUN npm prune --production
