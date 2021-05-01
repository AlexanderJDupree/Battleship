/**
 * Leaderboard returns a table of the Battleship server leaders
 */

import React, { useState, useContext, useEffect, useCallback } from 'react';
import { SocketContext } from '../contexts';
import {
  ServerToClient as Server,
  ClientToServer as Client,
} from 'common/lib/events';
import { Badge, Spinner, Table, TableProps } from 'react-bootstrap';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';

enum LeaderboardStatus {
  Loading,
  Loaded,
  Error,
}

interface LeaderboardProps extends TableProps {
  leaderboard: { username: string; wins: number }[];
}

const LeaderboardLoaded: React.FC<LeaderboardProps> = (props) => {
  const getCrownIcon = (i: number) => {
    let color = () => {
      switch (i) {
        case 0:
          return { color: 'orange' };
        case 1:
          return { color: 'silver' };
        default:
          return { color: 'coral' };
      }
    };
    return i < 3 ? (
      <FA icon={faCrown} className='mr-2' style={color()} />
    ) : (
      <></>
    );
  };

  return (
    <Table {...props}>
      <thead>
        <tr className='table-active'>
          <th className='text-center'>User</th>
          <th className='text-center'>Wins</th>
        </tr>
      </thead>
      <tbody>
        {props.leaderboard.slice(0, 6).map(({ username, wins }, i) => {
          return (
            <tr key={i}>
              <td className='text-center'>
                {getCrownIcon(i)}
                {username}
              </td>
              <td className='text-center'>
                <Badge variant='info'>{wins}</Badge>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

const Leaderboard: React.FC<TableProps> = (props) => {
  const socket = useContext(SocketContext);

  const [state, setState] = useState<LeaderboardStatus>(
    LeaderboardStatus.Loading
  );

  const [leaderboard, setLeaderboard] = useState<Server.Leaderboard>([]);

  const handleError = useCallback(() => {
    setState(LeaderboardStatus.Error);
  }, []);

  const refreshLeaderboard = useCallback(() => {
    if (socket.connected) {
      socket.emit(Client.GetLeaderboard, (response) => {
        setState(LeaderboardStatus.Loaded);
        setLeaderboard(response);
      });
    } else {
      setState(LeaderboardStatus.Error);
    }
  }, [socket]);

  useEffect(() => {
    socket.on(Server.ConnectError, handleError);

    const interval = setInterval(refreshLeaderboard, 1000);
    return () => {
      clearInterval(interval);
      socket.off(Server.ConnectError, handleError);
    };
  }, [socket, handleError, refreshLeaderboard]);

  switch (state) {
    case LeaderboardStatus.Loading:
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
    case LeaderboardStatus.Error:
      return <div className='mx-auto mt-4'>Something went wrong... 🤷‍♂️</div>;
    case LeaderboardStatus.Loaded:
      return <LeaderboardLoaded {...props} leaderboard={leaderboard} />;
  }
};

export default Leaderboard;
