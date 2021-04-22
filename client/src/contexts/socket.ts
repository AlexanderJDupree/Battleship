import React from 'react';
import { io, Socket } from 'socket.io-client';
import {
  ServerToClient as Server,
  ClientToServer as Client,
  Common,
} from 'common/lib/events';

// TODO read server url from some config file
export const socket: Socket<Server.Events, Client.Events> = io(
  'ws://localhost:8080'
);
export const SocketContext = React.createContext(socket);

socket.on(Server.Connect, () => {
  // Logic for when we connect/reconnect to the server
});

socket.on(Server.ConnectError, () => {
  // This event fires when the server connection cannot be established
  // in which case the client will attempt to reconnect. Or the servers
  // middleware refused the connection, which means we need to fix the
  // error and manually reconnect
  // TODO: display a message to the user that the server is down or something
});

socket.on(Server.Disconnect, (reason: string) => {
  // Client disconnected
});

socket.on(Common.DebugMessage, (msg: string) => {
  console.log(msg);
});
