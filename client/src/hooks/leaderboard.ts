/**
 * Leaderboard hook polls the server for updated leaderboard data and returns it.
 */

import { useState, useContext, useEffect, useCallback } from 'react';
import { SocketContext } from '../contexts';
import {
  ServerToClient as Server,
  ClientToServer as Client,
} from 'common/lib/events';

export enum LeaderboardStatus {
  Loading,
  Loaded,
  Error,
}

const useLeaderboard = () => {
  const socket = useContext(SocketContext);

  const [status, setStatus] = useState<LeaderboardStatus>(
    LeaderboardStatus.Loading
  );

  const [leaderboard, setLeaderboard] = useState<Server.Leaderboard>([]);

  const handleError = useCallback(() => {
    setStatus(LeaderboardStatus.Error);
  }, []);

  const refreshLeaderboard = useCallback(() => {
    if (socket.connected) {
      socket.emit(Client.GetLeaderboard, (response) => {
        setStatus(LeaderboardStatus.Loaded);
        setLeaderboard(response);
      });
    } else {
      setStatus(LeaderboardStatus.Error);
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

  return { status, leaderboard };
};

export default useLeaderboard;
