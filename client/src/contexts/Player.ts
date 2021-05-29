import React from 'react';
import { PLAYER, PlayerState, newPlayerState } from 'common/lib/GameLogic';

export const PlayerContext = React.createContext<PlayerState>(
  newPlayerState(PLAYER.PLAYER_1)
);
