FROM node:14.15.0-alpine as angular
WORKDIR /app
ADD package*.json ./
# RUN npm install --silent [(Quando estiver connectado a uma boa internet)]
ADD . .
CMD npm run build

FROM nginx:1.19.4-alpine
VOLUME /var/cache/nginx
COPY --from=angular app/dist/litroft-dev-mono/browser /usr/share/nginx/html

