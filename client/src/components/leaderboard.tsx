/**
 * Leaderboard returns a table of the Battleship server leaders
 */

import React, { useState, useContext, useEffect, useCallback } from 'react';
import { SocketContext } from '../contexts';
import {
  ServerToClient as Server,
  ClientToServer as Client,
} from 'common/lib/events';
import { Badge, Table, TableProps } from 'react-bootstrap';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';

interface LeaderboardProps extends TableProps {}

const Leaderboard: React.FC<LeaderboardProps> = (props) => {
  return (
    <Table {...props}>
      <thead>
        <tr className='table-active'>
          <th>User</th>
          <th>Wins</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <FA icon={faCrown} className='leader-icon mr-2' />
            Rick
          </td>
          <td>
            <Badge variant='info'>42</Badge>
          </td>
        </tr>
        <tr>
          <td>Morty</td>
          <td>
            <Badge variant='info'>38</Badge>
          </td>
        </tr>
        <tr>
          <td>Beth</td>
          <td>
            <Badge variant='info'>32</Badge>
          </td>
        </tr>
        <tr>
          <td>Summer</td>
          <td>
            <Badge variant='info'>11</Badge>
          </td>
        </tr>
        <tr>
          <td>TODO</td>
          <td>
            <Badge variant='info'>10</Badge>
          </td>
        </tr>
        <tr>
          <td>Refactor</td>
          <td>
            <Badge variant='info'>9</Badge>
          </td>
        </tr>
        <tr>
          <td>This</td>
          <td>
            <Badge variant='info'>8</Badge>
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default Leaderboard;
