FROM node

WORKDIR /prince-duals/lib/config
COPY package.json .
COPY npm-shrinkwrap.json .
RUN npm install
RUN npm audit --audit-level=critical
COPY . .

ARG PRINCE_DUALS_WS_PROTOCOL
ARG PRINCE_DUALS_WS_PORT
ARG PRINCE_DUALS_WEB_DOMAIN
ARG PRINCE_DUALS_WEB_PROTOCOL
ARG PRINCE_DUALS_WEB_PORT
ARG PRINCE_DUALS_OFFLINE_MODE

RUN npm run build -- \
	--domain=$PRINCE_DUALS_WEB_DOMAIN \
	--web-protocol=$PRINCE_DUALS_WEB_PROTOCOL \
	--web-port=$PRINCE_DUALS_WEB_PORT \
	--ws-protocol=$PRINCE_DUALS_WS_PROTOCOL \
	--ws-port=$PRINCE_DUALS_WS_PORT \
	--offline-mode=$PRINCE_DUALS_OFFLINE_MODE

RUN npm prune --production
