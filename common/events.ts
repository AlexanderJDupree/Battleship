/**
 * Battleship game socket events
 *
 */
import { Socket } from 'socket.io';

export namespace Common {
  /**
   * Event fires when the server/client sends a debug message
   */
  export const DebugMessage = 'debugMsg';

  export interface Events {
    debugMsg: (msg: string) => void;
  }
}

export namespace ServerToClient {
  /**
   * Event fired when:
   *    - Low level connection cannot be established
   *    - The connection is denied by the servers middleware
   *
   * If connection couldn't be established the socket client will
   * automatically attempt to reconnect. If the middleware denied the
   * connection then the client will need to fix the issue and reconnect
   * manually.
   */
  export const ConnectError = 'connect_error';

  /**
   * Event fires when the client is connected or reconnected to
   * the server.
   */
  export const Connect = 'connect';

  /**
   * Event fires then the client has disconnected
   */
  export const Disconnect = 'disconnect';

  /**
   * Typed events interface for Server to Client
   */
  export interface Events extends Common.Events {
    connect_error: () => void;
    connect: () => void;
    disconnect: () => void;
  }

  export type Stats = {
    playersOnline: number;
    activeGames: number;
    gamesPlayed: number;
  };

  export type Leaderboard = { username: string; wins: number }[];
}

export namespace ClientToServer {
  /**
   * Event fires when the Server receives a new socket connection
   */
  export const Connection = 'connection';

  /**
   * Event fires when a socket was disconneted
   */
  export const Disconnect = 'disconnect';

  /**
   * Typed events interface for Client to Server
   */
  export interface Events extends Common.Events {
    connection: (socket: Socket) => void;
    disconnect: (reason: string) => void;
  }
}
