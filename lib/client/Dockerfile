FROM prince-duals-ws-client
FROM prince-duals-link
FROM prince-duals-config
FROM prince-duals-offline

FROM node
COPY --from=0 /prince-duals/lib/ws-client /prince-duals/lib/ws-client
COPY --from=1 /prince-duals/lib/link /prince-duals/lib/link
COPY --from=2 /prince-duals/lib/config /prince-duals/lib/config
COPY --from=3 /prince-duals/lib/offline /prince-duals/lib/offline
WORKDIR /prince-duals/lib/client
COPY package.json .
COPY npm-shrinkwrap.json .
RUN npm install
RUN npm audit --audit-level=critical
COPY . .
RUN npm run build
#RUN npm prune --production
