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
  JoinGameStatus,
  validateUsername,
  RoomStatus,
} from 'common/lib/details';
import { ServerName } from 'common/lib/details';
import { Server, Client, Common } from 'common/lib/events';
import { ExtendedSocket, genID } from './utils';
import * as config from './config';
import { MemorySessionStore } from './session';
import { MemoryGameStore } from './game';
import {
  getPlayerState,
  getOpponentState,
  fireAtPlayer,
  SHIP,
} from 'common/lib/GameLogic';

/// Setup server and socket.io
const app = Express();
const server = createServer(app);
const io = new IO<Client.Events, Server.Events>(server, {
  // https://socket.io/docs/v4/server-initialization/#Options
  cors: config.CORS_OPTIONS,
});
const sessionStore = new MemorySessionStore();
const gameStore = new MemoryGameStore();

/// Setup Middleware
app.use(cors(config.CORS_OPTIONS));

io.use((socket: ExtendedSocket, next) => {
  let error = null;

  // Resume session if it exists
  const sessionID = socket.handshake.auth.sessionID;
  if (sessionID) {
    let session = sessionStore.get(sessionID);
    if (session) {
      socket.username = session.username;
      socket.userID = session.userID;
      socket.sessionID = sessionID;
      return next();
    }
    error = 'session not found';
  } else {
    // Create new session
    const username = socket.handshake.auth.username;
    let status = validateUsername(username);
    if (status === true) {
      socket.username = username;
      socket.userID = genID();
      socket.sessionID = genID();
      return next();
    }
    error = status;
  }
  return next(new Error(error));
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

    // Update session store
    sessionStore.set(socket.sessionID, {
      username: socket.username,
      userID: socket.userID,
      connected: false,
    });
  });

  socket.on(Client.CheckRoom, (roomID, callback) => {
    let game = gameStore.get(roomID);
    if (game) {
      if (game.playerIDs.includes(socket.userID) || !game.playerIDs[1]) {
        callback(RoomStatus.Ok);
      } else {
        callback(RoomStatus.RoomFull);
      }
    } else {
      callback(RoomStatus.NotFound);
    }
  });

  socket.on(Client.LeaveRoom, (roomID) => socket.leave(roomID));

  socket.on(Client.CreateGame, (isPublic, callback) => {
    let gid = gameStore.create(socket.userID, isPublic);
    socket.join(gid);
    console.log(
      `create_game[${socket.username}:${socket.sessionID}] : ${gid} - ${isPublic}`
    );
    callback(gid);
  });

  socket.on(Client.FindGame, (callback) => {
    let game = gameStore
      .all()
      .find((elem) => elem.game.isPublic && !elem.game.playerIDs[1]);

    if (game) {
      socket.join(game.gid);
      gameStore.set(game.gid, {
        ...game.game,
        playerIDs: [game.game.playerIDs[0], socket.userID],
      });
      callback(game.gid);
    } else {
      let gid = gameStore.create(socket.userID, true);
      socket.join(gid);
      callback(gid);
      console.log(
        `find_game[${socket.username}:${socket.sessionID}] : Created ${gid}`
      );
    }
  });

  // TODO refactor this mess.
  socket.on(Client.JoinGame, (gameID, callback) => {
    // Resume game from session store if it exists
    let game = gameStore.get(gameID);
    if (game) {
      if (game.playerIDs.includes(socket.userID)) {
        // Player is reconnecting to room
        socket.join(gameID);
        callback(JoinGameStatus.JoinSuccess);
      } else if (!game.playerIDs[1]) {
        // Room has a vacant slot, join game
        socket.join(gameID);
        gameStore.set(gameID, {
          ...game,
          playerIDs: [game.playerIDs[0], socket.userID],
        });
        callback(JoinGameStatus.JoinSuccess);
      } else {
        callback(JoinGameStatus.Error);
      }
    } else {
      callback(JoinGameStatus.GameNotFound);
    }
  });

  socket.on(Client.ChatMessage, (gameID, msg) => {
    let game = gameStore.get(gameID);
    if (game) {
      if (game.playerIDs.includes(socket.userID)) {
        io.to(gameID).emit(Server.ChatMessage, {
          username: socket.username,
          msg,
        });
      }
    }
  });

  socket.on(Client.ReadyUp, (setupBoard, gameID) => {
    let game = gameStore.get(gameID);
    if (game) {
      if (game.playerIDs.includes(socket.userID)) {
        let index = game.playerIDs.indexOf(socket.userID);
        game.playerStates[index].setupBoard = setupBoard;
        game.playerStates[index].isReady = true;
        gameStore.set(gameID, game);
        console.log('readyup event received');
      }
    }
  });

  socket.on(Client.TakeShot, (gameID, location) => {
    let game = gameStore.get(gameID);
    if (game) {
      if (game.playerIDs.includes(socket.userID)) {
        let shooter = getPlayerState(game, socket.userID);
        let target = getOpponentState(game, socket.userID);
        let result = fireAtPlayer(target, location);
        shooter.didLastShotHit = result != SHIP.NONE;
        shooter.lastShipHit = result;
        shooter.shots.push(location);
        io.to(gameID).emit(Server.UpdateGameState, game);
        gameStore.set(gameID, game);
        console.log('takeshot event received');
      }
    }
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
    activeGames: gameStore.length(),
    gamesPlayed: gameStore.length(), // TODO track number of games played and return that value
  });
});

/// Start the server!
server.listen(config.PORT, () => {
  console.log(`Listening on port ${config.PORT}...`);
});
