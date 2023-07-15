FROM prince-duals-config

FROM node
COPY --from=0 /prince-duals/lib/config /prince-duals/lib/config
WORKDIR /prince-duals/lib/ws-client
COPY package.json .
COPY npm-shrinkwrap.json .
RUN npm install
RUN npm audit --audit-level=critical
COPY . .
RUN npm run build
#RUN npm prune --production
