FROM node:lts-alpine
WORKDIR /prince-duals
COPY --from=prince-duals-build /prince-duals/backend/dist .
CMD node main.js
