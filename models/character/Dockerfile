FROM prince-duals-config
FROM prince-duals-game
FROM prince-duals-ws-client

FROM node
COPY --from=0 /prince-duals/lib/config /prince-duals/lib/config
COPY --from=1 /prince-duals/models/game /prince-duals/models/game
COPY --from=2 /prince-duals/lib/ws-client /prince-duals/lib/ws-client
WORKDIR /prince-duals/models/character
COPY package.json .
COPY npm-shrinkwrap.json .
RUN npm install
RUN npm audit --audit-level=critical
COPY . .
RUN npm run build
RUN npm prune --production
