# Dockerfile

FROM node:20-alpine
RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
COPY . .
CMD [ "npm", "start"]