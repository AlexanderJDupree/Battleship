/**
 *  Battleship server utility functions and types
 */

import Express from 'express';
import crypto from 'crypto';
import { Socket } from 'socket.io';
import { Server, Client } from 'common/lib/events';

export const randomID = () => crypto.randomBytes(8).toString('hex');

// Socket.IO middleware wrapper
export const wrap = (middleware) => (socket, next) =>
  middleware(socket.request, {}, next);

// This is a typescript workaround for express-session.
// TODO figure out how to get typescript to strongly type the session object
export type ExtendedRequest = Express.Request & {
  session: any;
};

export interface ExtendedSocket extends Socket<Client.Events, Server.Events> {
  request: ExtendedRequest;
}
