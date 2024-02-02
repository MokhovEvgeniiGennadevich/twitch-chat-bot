# Dockerfile

FROM node:20-alpine
RUN mkdir -p /app
WORKDIR /app
COPY package.json package-lock.json tsconfig.json nodemon.json ./src ./
RUN npm install
RUN npm run build
COPY . .
CMD [ "npm", "start"]