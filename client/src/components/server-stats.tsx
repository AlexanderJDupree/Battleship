/**
 * SiteStats components aggregates stats from the server into a listgroup and
 * periodically polls the server for new stats.
 */

import React from 'react';
import { ListGroup, ListGroupProps } from 'react-bootstrap';
import useServerStats, { ServerStatus } from '../hooks/server-stats';

interface ServerStatsProps extends ListGroupProps {
  variant?: 'flush';
  interval?: number;
}

const statusToTextColor = (status: ServerStatus) => {
  switch (status) {
    case ServerStatus.Ok:
      return 'text-success';
    case ServerStatus.Error:
      return 'text-danger';
    case ServerStatus.Connecting:
      return 'text-info';
  }
};

const ServerStats: React.FC<ServerStatsProps> = (props) => {
  const server = useServerStats(3000); // Refresh every 3 seconds

  return (
    <ListGroup {...props}>
      <ListGroup.Item className={statusToTextColor(server.status)}>
        {server.status}
      </ListGroup.Item>
      <ListGroup.Item>
        Players Online: {server.stats.playersOnline}
      </ListGroup.Item>
      <ListGroup.Item>Active Games: {server.stats.activeGames}</ListGroup.Item>
      <ListGroup.Item>Games Played: {server.stats.gamesPlayed}</ListGroup.Item>
    </ListGroup>
  );
};

export default ServerStats;
