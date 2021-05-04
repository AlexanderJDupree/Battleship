/**
 * Leaderboard hook polls the server for updated leaderboard data and returns it.
 */

import { useState, useEffect, useCallback } from 'react';
import { ServerToClient as Server } from 'common/lib/events';
import { SERVER_URL } from '../contexts/socket';
import axios from 'axios';

export enum LeaderboardStatus {
  Loading,
  Loaded,
  Error,
}

const useLeaderboard = (refresh?: number) => {
  const [status, setStatus] = useState<LeaderboardStatus>(
    LeaderboardStatus.Loading
  );

  const [leaderboard, setLeaderboard] = useState<Server.Leaderboard>([]);

  const handleError = useCallback((err) => {
    console.log(err);
    setStatus(LeaderboardStatus.Error);
  }, []);

  const updateLeaderboard = useCallback((resp) => {
    setLeaderboard(resp.data);
    setStatus(LeaderboardStatus.Loaded);
  }, []);

  const getLeaderboard = useCallback(() => {
    axios
      .get<Server.Leaderboard>(`${SERVER_URL}/leaderboard`)
      .then(updateLeaderboard)
      .catch(handleError);
  }, [handleError, updateLeaderboard]);

  useEffect(() => {
    getLeaderboard();

    if (refresh) {
      // Refresh leaderboard at specified interval
      const interval = setInterval(getLeaderboard, refresh);
      return () => clearInterval(interval);
    }
  }, [getLeaderboard, refresh]);

  return { status, leaderboard };
};

export default useLeaderboard;
