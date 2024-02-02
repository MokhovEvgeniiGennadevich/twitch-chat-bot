# Dockerfile

FROM node:20-alpine
RUN mkdir -p /app
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
CMD [ "npm", "start"]