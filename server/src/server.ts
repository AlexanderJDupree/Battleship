import Express from 'express';
import { createServer } from 'http'; // TODO use https server instead
import { Server, Socket } from 'socket.io';
import { SocketEvent as Event } from 'common/lib/events';

const server = createServer(Express());
const io = new Server(server, {
  // https://socket.io/docs/v4/server-initialization/#Options
  cors: {
    origin: 'http://localhost:3000', // TODO the clients address needs to be dynamically loaded
    methods: ['GET', 'POST'],
  },
});

// TODO: Add session management to connected sockets
io.on(Event.Server.Connection, (socket: Socket) => {
  socket.emit(Event.DebugMessage, `Socket ID: ${socket.id}`);

  socket.on(Event.Server.Disconnect, (reason: string) => {
    console.log(`disconnect[${socket.id}] : ${reason}`);
  });

  socket.on(Event.DebugMessage, (msg: string) => {
    console.log(`debug[${socket.id}]: ${msg}`);
  });
});

// TODO parameterize server port with a config file or environment variable
server.listen(8080, () => {
  console.log('Listening on port 8080...');
});
