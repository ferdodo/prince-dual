FROM prince-duals-ws-server
FROM prince-duals-player
FROM prince-duals-game
FROM prince-duals-character
FROM prince-duals-link

FROM node
COPY --from=0 /prince-duals/lib/ws-server /prince-duals/lib/ws-server
COPY --from=1 /prince-duals/domains/player /prince-duals/domains/player
COPY --from=2 /prince-duals/models/game /prince-duals/models/game
COPY --from=3 /prince-duals/models/character /prince-duals/models/character
COPY --from=4 /prince-duals/lib/link /prince-duals/lib/link
WORKDIR /prince-duals/backend
COPY package.json .
COPY npm-shrinkwrap.json .
RUN npm install
RUN npm audit --audit-level=critical

COPY . .
RUN npm run build
CMD node dist/main.js
