/**
 * Battleship server entrypoint
 *
 * TODO: Split this up into seperate files since this file is growing quite fast
 */
import Express from 'express';
import { createServer } from 'http';
import { Server as IO, Socket } from 'socket.io';
import cors from 'cors';
import { validateUsername } from 'common/lib/details';
import { Server, Client, Common } from 'common/lib/events';
import { ExtendedSocket } from './utils';
import { genID } from './session';
import * as config from './config';
import { MemorySessionStore } from './session';

/// Setup server and socket.io
const app = Express();
const server = createServer(app);
const io = new IO<Client.Events, Server.Events>(server, {
  // https://socket.io/docs/v4/server-initialization/#Options
  cors: config.CORS_OPTIONS,
});
const sessionStore = new MemorySessionStore();

/// Setup Middleware
app.use(cors(config.CORS_OPTIONS));

// TODO: refactor, lots of if/elses
io.use((socket: ExtendedSocket, next) => {
  const sessionID = socket.handshake.auth.sessionID;
  if (sessionID) {
    // Resume session if it exists
    let session = sessionStore.get(sessionID);
    if (session) {
      socket.username = session.username;
      socket.userID = session.userID;
      socket.sessionID = sessionID;
      return next();
    } else {
      // TODO make server errors named constants in the common library
      return next(new Error('session not found'));
    }
  } else {
    // Create new session
    const username = socket.handshake.auth.username;
    let status = validateUsername(username);
    if (status === true) {
      socket.username = username;
      socket.userID = genID();
      socket.sessionID = genID();
      next();
    } else {
      return next(new Error(status));
    }
  }
});

/// Socket IO event handlers
io.on(Client.Connection, (socket: ExtendedSocket) => {
  console.log(
    `connection[${socket.username}:${socket.sessionID}] : user connected`
  );

  // Persist session
  sessionStore.set(socket.sessionID, {
    username: socket.username,
    userID: socket.userID,
    connected: true,
  });

  // Update session details on the client
  socket.emit(Server.CreateSession, {
    username: socket.username,
    userID: socket.userID,
    sessionID: socket.sessionID,
  });

  socket.on(Common.DebugMessage, (msg: string) => {
    console.log(`debug[${socket.username}:${socket.sessionID}]: ${msg}`);
  });

  socket.on(Client.Disconnect, (reason: string) => {
    console.log(
      `disconnect[${socket.username}:${socket.sessionID}] : ${reason}`
    );

    sessionStore.set(socket.sessionID, {
      username: socket.username,
      userID: socket.userID,
      connected: false,
    });
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
