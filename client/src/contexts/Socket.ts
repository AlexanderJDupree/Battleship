import React from 'react';
import { io, Socket } from 'socket.io-client';
import { Server, Client, Common } from 'common/lib/events';

const SERVER_PORT = process.env.REACT_APP_SERVER_PORT || 8080;
export const SERVER_URL =
  process.env.REACT_APP_SERVER_URI || `http://localhost:${SERVER_PORT}`;

export const socket: Socket<Server.Events, Client.Events> = io(SERVER_URL, {
  autoConnect: false,
});
export const SocketContext = React.createContext(socket);

socket.on(Server.Connect, () => {
  console.log(`Connected to server at ${SERVER_URL}`);
});

socket.on(Server.ConnectError, (err: Error) => {
  console.log(`Failure to connect to ${SERVER_URL}: ${err}`);
});

socket.on(Server.Disconnect, (reason: string) => {
  console.log(`Disconnected from ${SERVER_URL}: ${reason}`);
});

socket.on(Common.DebugMessage, (msg: string) => {
  console.log(msg);
});
