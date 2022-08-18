FROM node:14.17-alpine AS base
RUN mkdir /app
WORKDIR /app 
COPY package.json package-lock*.json ./
COPY . .
ENV PATH=/app/node_modules/.bin:$PATH
RUN npm ci && npm cache clean --force && npm install
RUN chmod +x ./init.sh
ENTRYPOINT ["sh", "./init.sh"]