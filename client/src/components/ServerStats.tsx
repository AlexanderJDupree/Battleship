/**
 * SiteStats components aggregates stats from the server into a listgroup and
 * periodically polls the server for new stats.
 */

import React from 'react';
import { ListGroup, ListGroupProps, Spinner } from 'react-bootstrap';
import useFetch, { FetchStatus } from '../hooks/UseFetch';
import { SERVER_URL } from '../contexts/Socket';
import { ServerToClient as Server } from 'common/lib/events';

const ServerStats: React.FC<ListGroupProps> = (props) => {
  const server = useFetch<Server.Stats>(
    `${SERVER_URL}/stats`,
    { playersOnline: 0, activeGames: 0, gamesPlayed: 0 },
    2000
  ); // Refresh every 3 seconds

  switch (server.status) {
    case FetchStatus.Loading:
      return (
        <div className='h-100 d-flex justify-content-center align-items-center'>
          <Spinner
            animation='border'
            role='status'
            className='theme-secondary-light'
          >
            <span className='sr-only'>Loading...</span>
          </Spinner>
        </div>
      );
    case FetchStatus.Error:
      return (
        <div className='mx-auto mt-4 text-danger'>No response from Server</div>
      );
    case FetchStatus.Loaded:
      return (
        <ListGroup {...props}>
          <ListGroup.Item className='text-success'>
            Server Online!
          </ListGroup.Item>
          <ListGroup.Item>
            Players Online: {server.data.playersOnline}
          </ListGroup.Item>
          <ListGroup.Item>
            Active Games: {server.data.activeGames}
          </ListGroup.Item>
          <ListGroup.Item>
            Games Played: {server.data.gamesPlayed}
          </ListGroup.Item>
        </ListGroup>
      );
  }
};

export default ServerStats;
