/**
 * Leaderboard returns a table of the Battleship server leaders
 */

import React from 'react';
import { Badge, Spinner, Table, TableProps } from 'react-bootstrap';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import useFetch, { FetchStatus } from '../hooks/UseFetch';
import { SERVER_URL } from '../contexts/Socket';
import { Leaderboard as ServerLeaderboard } from 'common/lib/details';

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
  const leaderboard = useFetch<ServerLeaderboard>(
    `${SERVER_URL}/leaderboard`,
    []
  );

  switch (leaderboard.status) {
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
    case FetchStatus.Loaded:
      return <LeaderboardLoaded {...props} leaderboard={leaderboard.data} />;
    case FetchStatus.Error:
    default:
      return <div className='mx-auto mt-4'>Something went wrong... 🤷‍♂️</div>;
  }
};

export default Leaderboard;
