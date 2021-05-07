/**
 * Battleship game socket events
 *
 */
import { Socket as IOSocket } from 'socket.io';
import { JoinGameStatus, RoomStatus } from './details';

/**
 * Events that can be sent by either the server or client
 */
export namespace Common {
  /**
   * Event fires when the server/client sends a debug message
   */
  export const DebugMessage = 'debugMsg';

  export interface Events {
    debugMsg: (msg: string) => void;
  }
}

/**
 * Events sent from the server to the client
 */
export namespace Server {
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
   * Event fires after user connects, provides client with session details
   */
  export const CreateSession = 'create_session';

  /**
   * Session details
   */
  export interface Session {
    username: string;
    userID: string;
    sessionID: string;
  }

  /**
   * Event fires after when a chat message is being relayed to the room
   */
  export const ChatMessage = 'relay_chat_message';

  /**
   * Typed events interface for Server to Client
   */
  export interface Events extends Common.Events {
    connect_error: (err: Error) => void;
    connect: () => void;
    disconnect: () => void;
    create_session: (session: Session) => void;
    relay_chat_message: ({
      username,
      msg,
    }: {
      username: string;
      msg: string;
    }) => void;
  }
}

/**
 * Events sent from the client to the server
 */
export namespace Client {
  /**
   * Event fires when the Server receives a new socket connection
   */
  export const Connection = 'connection';

  /**
   * Event fires when a socket was disconneted
   */
  export const Disconnect = 'disconnect';

  /**
   * Check if room id exists
   */
  export const CheckRoom = 'check_room';

  /**
   * Request to join matchmaking server
   */
  export const JoinMatchmaking = 'join_matchmaking';

  /**
   * Request to join a game
   */
  export const JoinGame = 'join_game';

  /**
   * Request to leave a room, does not forfeit game
   */
  export const LeaveRoom = 'leave_room';

  /**
   * Request to create a new game
   */
  export const CreateGame = 'create_game';

  /**
   * Emit chat message
   */
  export const ChatMessage = 'chat_message';

  /**
   * Typed events interface for Client to Server
   */
  export interface Events extends Common.Events {
    connection: (socket: IOSocket) => void;
    disconnect: (reason: string) => void;
    chat_message: (roomID: string, msg: string) => void;
    create_game: (ack: (roomID: string) => void) => void;
    // TODO add gamestate type
    join_game: (
      roomID: string,
      ack: (status: JoinGameStatus, gamestate?: {}) => void
    ) => void;
    leave_room: (roomID: string) => void;
    check_room: (roomID: string, ack: (roomStatus: RoomStatus) => void) => void;
  }
}
