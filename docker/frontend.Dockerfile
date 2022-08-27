FROM nginx
WORKDIR /prince-duals
COPY --from=prince-duals-build /prince-duals/frontend/dist /usr/share/nginx/html
