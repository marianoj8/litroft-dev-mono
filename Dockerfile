FROM node:14.15.1-alpine as angular
WORKDIR /app
COPY package.json /app
RUN npm install --silent
COPY . .
RUN npm run build

FROM nginx:1.19.4-alpine
VOLUME /var/cache/nginx
COPY --from=angular app/dist/litroft-dev-mono/browser /usr/share/nginx/html
COPY ./config/nginx.cong /etc/nginx/conf.d/default.conf
