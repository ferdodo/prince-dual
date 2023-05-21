FROM prince-duals-config
FROM prince-duals-link

FROM node
COPY --from=0 /prince-duals/lib/config /prince-duals/lib/config
COPY --from=1 /prince-duals/lib/link /prince-duals/lib/link
WORKDIR /prince-duals/lib/ws-client
COPY package.json .
COPY npm-shrinkwrap.json .
RUN npm install
RUN npm audit --audit-level=critical
COPY . .
RUN npm run build
#RUN npm prune --production
