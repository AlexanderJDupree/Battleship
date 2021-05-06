/**
 *  Battleship server utility functions and types
 */

import { Socket } from 'socket.io';
import { Server, Client } from 'common/lib/events';
import { SessionID, Session } from './session';

// Socket.IO middleware wrapper
export const wrap = (middleware) => (socket, next) =>
  middleware(socket.request, {}, next);

export type ExtendedSocket = Socket<Client.Events, Server.Events> &
  Session & {
    sessionID: SessionID;
  };
