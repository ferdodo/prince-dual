FROM node
WORKDIR /prince-duals/front
COPY package.json .
COPY npm-shrinkwrap.json .
RUN npm install
RUN npm audit --audit-level=moderate

FROM prince-duals-core

FROM node
COPY --from=0 /prince-duals/front/node_modules /prince-duals/front/node_modules
COPY --from=1 /prince-duals/core /prince-duals/core

WORKDIR /prince-duals/front
COPY . .
RUN npm run build

FROM nginx
COPY --from=2 /prince-duals/front/public /usr/share/nginx/html
