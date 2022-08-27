FROM node
WORKDIR /prince-duals
COPY package.json .
COPY npm-shrinkwrap.json .
RUN npm install
COPY . .
RUN npm run build -- --domain=localhost --web-protocol=http --web-port=9966 --ws-protocol=ws --ws-port=9977
