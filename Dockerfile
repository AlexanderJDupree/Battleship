# Battleship server docker file for Google Cloud Run deployment
FROM node:14-buster-slim

ENV SERVER_PORT=$PORT
ENV CORS=$CORS

COPY . /app

WORKDIR /app

RUN yarn install && yarn deploy-server

EXPOSE $PORT

CMD [ "node", "server/dist/server.js" ]
