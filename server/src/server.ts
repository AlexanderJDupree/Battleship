/**
 * Battleship server entrypoint
 *
 * TODO: Split this up into seperate files since this file is growing quite fast
 */
import Express from 'express';
import { createServer } from 'http';
import { Server as IO, Socket } from 'socket.io';
import cors from 'cors';
import {
  ServerToClient as Server,
  ClientToServer as Client,
  Common,
} from 'common/lib/events';

// Server configuration
const client_port = process.env.PORT || 3000;
const port = process.env.SERVER_PORT || 8080;
const allowedOrigins =
  process.env.ALLOWED_ORIGINS || `http://localhost:${client_port}`;
const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins.split(',').map((s) => new RegExp(s)),
  methods: ['GET', 'POST'],
};

// Setup server and socket.io
const app = Express();
const server = createServer(app);
const io = new IO<Client.Events, Server.Events>(server, {
  // https://socket.io/docs/v4/server-initialization/#Options
  cors: corsOptions,
});

interface ExtSocket extends Socket<Client.Events, Server.Events> {
  username: string;
}

// Setup Middleware
app.use(cors(corsOptions));

io.use((socket: ExtSocket, next) => {
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error('No username present'));
  }
  socket.username = username;
  next();
});

// Socket IO handlers
io.on(Client.Connection, (socket: ExtSocket) => {
  console.log(`connection[${socket.username}:${socket.id}] : user connected`);

  socket.on(Common.DebugMessage, (msg: string) => {
    console.log(`debug[${socket.username}:${socket.id}]: ${msg}`);
  });

  socket.on(Client.Disconnect, (reason: string) => {
    console.log(`disconnect[${socket.username}:${socket.id}] : ${reason}`);
  });
});

// Express server handlers
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'running',
    activeClients: io.sockets.sockets.size,
    allowedOrigins: allowedOrigins, // TODO this is here as a sanity check, should remove in future versions
  });
});

app.get('/leaderboard', (req, res) => {
  res.status(200).json([
    // TODO fill with actual leaderboard data
    { username: 'Rick', wins: 42 },
    { username: 'Morty', wins: 39 },
    { username: 'Beth', wins: 23 },
    { username: 'Summer', wins: 13 },
    { username: 'Jerry', wins: 1 },
    { username: 'Squanch', wins: 1 },
  ]);
});

app.get('/stats', (req, res) => {
  res.status(200).json({
    playersOnline: io.sockets.sockets.size,
    activeGames: 0, // TODO return actual value
    gamesPlayed: 0, // TODO return actual value
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
