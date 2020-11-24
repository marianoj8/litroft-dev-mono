FROM node:14.15.0-alpine as angular
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
# [(Quando estiver connectado a uma boa internet)], descomente a linha 5
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.19.4-alpine
VOLUME /var/cache/nginx
COPY --from=angular app/dist/litroft-dev-mono/browser /usr/share/nginx/html
