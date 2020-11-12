FROM node:14.15.0-alpine
WORKDIR /app
ADD package*.json ./
RUN npm install
ADD . .
CMD npm run start
