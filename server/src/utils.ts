/**
 *  Battleship server utility functions and types
 */

import crypto from 'crypto';
import { Socket } from 'socket.io';
import { Server, Client } from 'common/lib/events';
import { SessionID, Session } from './session';

export const genID = () => crypto.randomBytes(10).toString('hex');

// Socket.IO middleware wrapper
export const wrap = (middleware) => (socket, next) =>
  middleware(socket.request, {}, next);

export type ExtendedSocket = Socket<Client.Events, Server.Events> &
  Session & {
    sessionID: SessionID;
  };
