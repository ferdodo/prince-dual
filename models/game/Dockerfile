FROM node
WORKDIR /prince-duals/models/game
COPY package.json .
COPY npm-shrinkwrap.json .
RUN npm install
RUN npm audit --audit-level=critical
COPY . .
RUN npm run build
RUN npm prune --production
