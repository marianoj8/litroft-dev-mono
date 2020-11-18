FROM node:14.15.0-alpine
WORKDIR /app
ADD package*.json ./
RUN npm install
ADD . .
CMD npm run start

# FROM node:14.15.0-alpine
# WORKDIR /app
# # COPY package.json /app
# # COPY package-lock.json /app
# # RUN npm install
# COPY . .
# # SHELL [ "/bin/bash", "-c" ]
# RUN npm run build
