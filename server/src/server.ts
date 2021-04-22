import Express from 'express';
import { createServer } from 'http'; // TODO use https server instead
import { Server as IO, Socket } from 'socket.io';
import {
  ServerToClient as Server,
  ClientToServer as Client,
  Common,
} from 'common/lib/events';

const server = createServer(Express());
const io = new IO<Client.Events, Server.Events>(server, {
  // https://socket.io/docs/v4/server-initialization/#Options
  cors: {
    origin: 'http://localhost:3000', // TODO the clients address needs to be dynamically loaded
    methods: ['GET', 'POST'],
  },
});

// TODO: Add session management to connected sockets
io.on(Client.Connection, (socket: Socket) => {
  socket.emit(Common.DebugMessage, `Socket ID: ${socket.id}`);

  socket.on(Client.Disconnect, (reason: string) => {
    console.log(`disconnect[${socket.id}] : ${reason}`);
  });

  socket.on(Common.DebugMessage, (msg: string) => {
    console.log(`debug[${socket.id}]: ${msg}`);
  });
});

// TODO parameterize server port with a config file or environment variable
server.listen(8080, () => {
  console.log('Listening on port 8080...');
});
