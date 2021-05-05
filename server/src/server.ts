/**
 * Battleship server entrypoint
 *
 * TODO: Split this up into seperate files since this file is growing quite fast
 */
import cors from 'cors';
import Express from 'express';
import { createServer } from 'http';
import { Server as IO } from 'socket.io';
import { validateUsername } from 'common/lib/details';
import { Server, Client, Common } from 'common/lib/events';
import { ExtendedSocket, randomID, wrap } from './utils';
import * as config from './config';

/// Setup server and socket.io
const app = Express();
const server = createServer(app);
const io = new IO<Client.Events, Server.Events>(server, {
  // https://socket.io/docs/v4/server-initialization/#Options
  cors: config.CORS_OPTIONS,
});

/// Setup Middleware
app.use(cors(config.CORS_OPTIONS));
app.use(config.SESSION);

io.use(wrap(config.SESSION));
io.use((socket: ExtendedSocket, next) => {
  const username = socket.handshake.auth.username;
  let status = validateUsername(username);
  if (status === true) {
    socket.request.session.username = username;
    socket.request.session.userID = randomID();
    socket.request.session.save();
    next();
  } else {
    return next(new Error(status));
  }
});

/// Socket IO event handlers
io.on(Client.Connection, (socket: ExtendedSocket) => {
  console.log(
    `connection[${socket.request.session.username}:${socket.id}] : user connected`
  );

  // Emit session data to client
  socket.emit(Server.CreateSession, {
    username: socket.request.session.username,
    userID: socket.request.session.userID,
    sessionID: socket.request.session.id,
  });

  socket.on(Common.DebugMessage, (msg: string) => {
    console.log(
      `debug[${socket.request.session.username}:${socket.id}]: ${msg}`
    );
  });

  socket.on(Client.Disconnect, (reason: string) => {
    console.log(
      `disconnect[${socket.request.session.username}:${socket.id}] : ${reason}`
    );
  });
});

// Express server handlers
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'running',
    activeClients: io.sockets.sockets.size,
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

/// Start the server!
server.listen(config.PORT, () => {
  console.log(`Listening on port ${config.PORT}...`);
});
