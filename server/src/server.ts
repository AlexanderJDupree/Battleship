import Express from 'express';
import { createServer } from 'http'; // TODO use https server instead
import { Server as IO, Socket } from 'socket.io';
import {
  ServerToClient as Server,
  ClientToServer as Client,
  Common,
} from 'common/lib/events';

const client_port = process.env.PORT || 3000;
const port = process.env.SERVER_PORT || 8080;
const cors = process.env.CORS || `http://localhost:${client_port}`;

const server = createServer(Express());
const io = new IO<Client.Events, Server.Events>(server, {
  // https://socket.io/docs/v4/server-initialization/#Options
  cors: {
    origin: cors,
    methods: ['GET', 'POST'],
  },
});

io.on(Client.Connection, (socket: Socket) => {
  console.log(`connection[${socket.id}] : client connected`);

  socket.on(Client.Disconnect, (reason: string) => {
    console.log(`disconnect[${socket.id}] : ${reason}`);
  });

  socket.on(Common.DebugMessage, (msg: string) => {
    console.log(`debug[${socket.id}]: ${msg}`);
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
