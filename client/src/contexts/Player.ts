import React from 'react';
import { PLAYER, PlayerState } from 'common/lib/GameLogic';

export const PlayerContext = React.createContext<PlayerState>(
  new PlayerState(PLAYER.PLAYER_1)
);
