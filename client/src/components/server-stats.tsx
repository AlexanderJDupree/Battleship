/**
 * SiteStats components aggregates stats from the server into a listgroup and
 * periodically polls the server for new stats.
 */

import React, { useState, useContext, useEffect, useCallback } from 'react';
import { SocketContext } from '../contexts';
import { ListGroup } from 'react-bootstrap';
import { ServerToClient as Server, Common } from 'common/lib/events';

enum ServerStatus {
  Unknown = 'Server status unknown',
  Connecting = 'Connecting to server. . .',
  ConnectionError = 'Error connecting to server',
  Ok = 'Connected to server!',
}

type ServerStatsProps = {
  className?: string;
  variant?: 'flush';
  interval?: number;
};

interface Stats {
  status: ServerStatus;
  playersOnline: number;
  activeGames: number;
  gamesPlayed: number;
}

const StatusTextColor = (status: ServerStatus) => {
  switch (status) {
    case ServerStatus.Ok:
      return 'text-success';
    case ServerStatus.ConnectionError:
      return 'text-danger';
    case ServerStatus.Connecting:
      return 'text-info';
    case ServerStatus.Unknown:
      return 'text-warning';
  }
};

const ServerStats: React.FC<ServerStatsProps> = (props) => {
  const socket = useContext(SocketContext);

  const [stats, setStats] = useState<Stats>({
    status: ServerStatus.Connecting,
    playersOnline: 0,
    activeGames: 0,
    gamesPlayed: 0,
  });

  const handleConnect = useCallback(() => {
    setStats((s) => ({ ...s, status: ServerStatus.Ok }));
  }, []);
  const handleConnectError = useCallback(() => {
    setStats((s) => ({ ...s, status: ServerStatus.ConnectionError }));
  }, []);

  useEffect(() => {
    socket.on(Server.Connect, handleConnect);

    socket.on(Server.ConnectError, handleConnectError);

    const interval = setInterval(() => {}, props.interval || 1000);

    return () => clearInterval(interval);
  }, [props, socket, handleConnect, handleConnectError]);

  return (
    <ListGroup variant={props.variant} className={props.className}>
      <ListGroup.Item className={StatusTextColor(stats.status)}>
        {stats.status}
      </ListGroup.Item>
      <ListGroup.Item>Players Online: {stats.playersOnline}</ListGroup.Item>
      <ListGroup.Item>Active Games: {stats.activeGames}</ListGroup.Item>
      <ListGroup.Item>Games Played: {stats.gamesPlayed}</ListGroup.Item>
    </ListGroup>
  );
};

export default ServerStats;
