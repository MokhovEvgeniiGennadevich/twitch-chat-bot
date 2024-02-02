# Dockerfile

FROM node:20-alpine
RUN mkdir -p /app
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
RUN npm run build
COPY . .
CMD [ "npm", "start"]