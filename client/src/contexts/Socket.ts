import React from 'react';
import { io, Socket } from 'socket.io-client';
import { Server, Client, Common } from 'common/lib/events';

export interface ClientSocket extends Socket<Server.Events, Client.Events> {
  username?: string;
  userID?: string;
  sessionID?: string;
}

export const SERVER_PORT = process.env.REACT_APP_SERVER_PORT || 8080;
export const SERVER_URL =
  process.env.REACT_APP_SERVER_URI || `http://localhost:${SERVER_PORT}`;

export const socket: ClientSocket = io(SERVER_URL, {
  autoConnect: false,
});
export const SocketContext = React.createContext(socket);

export const hasSessionID = () => {
  return localStorage.getItem('sessionID') !== null;
};

socket.on(Server.Connect, () => {
  console.log(`Connected to server at ${SERVER_URL}`);
});

socket.on(Server.CreateSession, ({ username, userID, sessionID }) => {
  localStorage.setItem('sessionID', sessionID);
  socket.userID = userID;
  socket.username = username;

  if (socket.sessionID && sessionID !== socket.sessionID) {
    console.warn('sessionID mismatch');
  }
  socket.sessionID = sessionID;

  console.log(`Created session: ${username}:${userID}:${sessionID}`);
});

socket.on(Server.ConnectError, (err: Error) => {
  console.log(`Failure to connect to ${SERVER_URL}: ${err.message}`);
  if (err.message === 'session not found') {
    socket.auth = {};
    socket.sessionID = undefined;
    localStorage.removeItem('sessionID');
  }
});

socket.on(Server.Disconnect, (reason: string) => {
  console.log(`Disconnected from ${SERVER_URL}: ${reason}`);
});

socket.on(Common.DebugMessage, (msg: string) => {
  console.log(msg);
});

const initSocket = () => {
  let sessionID = localStorage.getItem('sessionID');
  if (sessionID) {
    // Resume session if it exists
    socket.sessionID = sessionID;
    socket.auth = { sessionID };
    socket.connect();
  }
};

initSocket();
