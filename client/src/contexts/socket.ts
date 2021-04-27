import React from 'react';
import { io, Socket } from 'socket.io-client';
import {
  ServerToClient as Server,
  ClientToServer as Client,
  Common,
} from 'common/lib/events';

const server_port = process.env.REACT_APP_SERVER_PORT || 8080;
export const server_uri =
  process.env.REACT_APP_SERVER_URI || `ws://localhost:${server_port}`;

export const socket: Socket<Server.Events, Client.Events> = io(server_uri);
export const SocketContext = React.createContext(socket);

socket.on(Server.Connect, () => {
  console.log(`Connected to server at ${server_uri}`);
});

socket.on(Server.ConnectError, () => {
  console.log(`Failure to connect to ${server_uri}`);
});

socket.on(Server.Disconnect, (reason: string) => {
  console.log(`Disconnected from ${server_uri}: ${reason}`);
});

socket.on(Common.DebugMessage, (msg: string) => {
  console.log(msg);
});
