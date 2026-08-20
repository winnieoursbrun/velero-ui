FROM node:lts-alpine AS build-stage
WORKDIR /app
COPY package.json yarn.lock ./
# Cypress is only needed to run the e2e tests, never to build the app.
RUN CYPRESS_INSTALL_BINARY=0 yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM nginx:stable-alpine AS production-stage
ENV API_URL=http://kubernetes.local
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
