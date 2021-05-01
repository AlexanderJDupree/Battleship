import Express from 'express';
import { createServer } from 'http';
import { Server as IO, Socket } from 'socket.io';
import {
  ServerToClient as Server,
  ClientToServer as Client,
  Common,
} from 'common/lib/events';

const client_port = process.env.PORT || 3000;
const port = process.env.SERVER_PORT || 8080;
const allowedOrigins =
  process.env.ALLOWED_ORIGINS || `http://localhost:${client_port}`;

const app = Express();
const server = createServer(app);
const io = new IO<Client.Events, Server.Events>(server, {
  // https://socket.io/docs/v4/server-initialization/#Options
  cors: {
    origin: allowedOrigins.split(',').map((s) => new RegExp(s)),
    methods: ['GET', 'POST'],
  },
});

// TODO: Add session management to connected sockets
io.on(Client.Connection, (socket: Socket) => {
  console.log(`connection[${socket.id}] : client connected`);

  socket.on(Common.DebugMessage, (msg: string) => {
    console.log(`debug[${socket.id}]: ${msg}`);
  });

  socket.on(Client.Disconnect, (reason: string) => {
    console.log(`disconnect[${socket.id}] : ${reason}`);
  });

  socket.on(Client.GetServerStats, (ack) => {
    ack({
      playersOnline: io.sockets.sockets.size,
      activeGames: 0, // TODO return actual value
      gamesPlayed: 0, // TODO return actual value
    });
  });

  socket.on(Client.GetLeaderboard, (resp) => {
    resp([
      // TODO fill with actual leaderboard data
      { username: 'Rick', wins: 42 },
      { username: 'Morty', wins: 39 },
      { username: 'Beth', wins: 23 },
      { username: 'Summer', wins: 13 },
      { username: 'Jerry', wins: 1 },
      { username: 'Squanch', wins: 1 },
    ]);
  });
});

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'running',
    activeClients: io.sockets.sockets.size,
    allowedOrigins: allowedOrigins, // TODO this is here as a sanity check, should remove in future versions
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
