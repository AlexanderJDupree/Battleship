# Battleship server docker file for Google Cloud Run deployment
# TODO make this a multi-stage Docker file and reduce the final image size
FROM node:14-buster-slim

COPY . /app

WORKDIR /app

RUN yarn install && yarn deploy-server

EXPOSE 8080

CMD [ "node", "server/dist/server.js" ]
