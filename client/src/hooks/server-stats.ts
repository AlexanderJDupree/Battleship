/**
 * Server Stats hook polls the server for updated server data and returns it.
 */

import { useState, useEffect, useCallback } from 'react';
import { ServerToClient as Server } from 'common/lib/events';
import { SERVER_URL } from '../contexts/socket';
import axios from 'axios';

export enum ServerStatus {
  Connecting = 'Connecting to server. . .',
  Error = 'Error connecting to server',
  Ok = 'Server Online!',
}

const useServerStats = (refresh?: number) => {
  const [status, setStatus] = useState<ServerStatus>(ServerStatus.Connecting);

  const [stats, setStats] = useState<Server.Stats>({
    playersOnline: 0,
    activeGames: 0,
    gamesPlayed: 0,
  });

  const handleError = useCallback((err) => {
    console.log(err);
    setStatus(ServerStatus.Error);
  }, []);

  const updateStats = useCallback((resp) => {
    setStats(resp.data);
    setStatus(ServerStatus.Ok);
  }, []);

  const getStats = useCallback(() => {
    axios
      .get<Server.Stats>(`${SERVER_URL}/stats`)
      .then(updateStats)
      .catch(handleError);
  }, [handleError, updateStats]);

  useEffect(() => {
    getStats();

    if (refresh) {
      const interval = setInterval(getStats, 3000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [getStats, refresh]);

  return { status, stats };
};

export default useServerStats;
