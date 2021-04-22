import Express from 'express';
import { createServer } from 'http'; // TODO use https server instead
import { Server, Socket } from 'socket.io';
import { DebugMessage } from 'common/lib/events';

const server = createServer(Express());
const io = new Server(server, {
  // https://socket.io/docs/v4/server-initialization/#Options
});

io.on('connection', (socket: Socket) => {
  socket.emit(DebugMessage, `Socket ID: ${socket.id}`);
});

// TODO parameterize server port with a config file or environment variable
server.listen(8080, () => {
  console.log('Listening on port 8080...');
});
