FROM node
WORKDIR /prince-duals/backend
COPY package.json .
COPY npm-shrinkwrap.json .
RUN npm install
RUN npm audit --audit-level=moderate

FROM prince-duals-core

FROM node
COPY --from=0 /prince-duals/backend/node_modules /prince-duals/backend/node_modules
COPY --from=1 /prince-duals/core /prince-duals/core

WORKDIR /prince-duals/backend
COPY . .
RUN npm run build
CMD node dist/main.js
