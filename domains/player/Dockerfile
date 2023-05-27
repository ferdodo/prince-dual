FROM prince-duals-link
FROM prince-duals-character
FROM prince-duals-game
FROM prince-duals-client
FROM prince-duals-config
FROM prince-duals-ws-client

FROM node
COPY --from=0 /prince-duals/lib/link /prince-duals/lib/link
COPY --from=1 /prince-duals/models/character /prince-duals/models/character
COPY --from=2 /prince-duals/models/game /prince-duals/models/game
COPY --from=3 /prince-duals/lib/client /prince-duals/lib/client
COPY --from=4 /prince-duals/lib/config /prince-duals/lib/config
COPY --from=5 /prince-duals/lib/ws-client /prince-duals/lib/ws-client
WORKDIR /prince-duals/domains/player
COPY package.json .
COPY npm-shrinkwrap.json .
RUN npm install
RUN npm audit --audit-level=critical
COPY . .
RUN npm run build
#RUN npm prune --production
