# Battleship server docker file for Google Cloud Run deployment
FROM node:14-buster-slim

COPY . /app

WORKDIR /app

RUN yarn install && yarn deploy-server

EXPOSE 8080

CMD [ "node", "server/dist/server.js" ]
