FROM node:14.17-alpine AS base
RUN mkdir /app
WORKDIR /app 
COPY package.json package-lock*.json ./
COPY . .
ENV PATH=/app/node_modules/.bin:$PATH
RUN apk add --no-cache openssl
ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz
RUN npm ci && npm cache clean --force && npm install