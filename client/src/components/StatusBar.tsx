import { useContext } from 'react';
import { PHASE, PLAYER } from 'common/lib/GameLogic';
import { PlayerContext } from '../contexts/Player';

const StatusBar = () => {
  const playerState = useContext(PlayerContext);

  let statusText = () => {
    switch (playerState.phase) {
      case PHASE.SETUP:
        return 'Place Your Ships';
      case PHASE.PLAYER1_TURN:
        if (playerState.player === PLAYER.PLAYER_1) {
          return 'Your Turn';
        } else {
          return 'Opponents Turn';
        }

      case PHASE.PLAYER2_TURN:
        if (playerState.player === PLAYER.PLAYER_2) {
          return 'Your Turn';
        } else {
          return 'Opponents Turn';
        }

      case PHASE.GAME_OVER:
        if (playerState.isWinner) {
          return 'You Won!';
        } else {
          return 'You Lose!';
        }
      default:
        return '';
    }
  };

  return (
    <div className='status-bar'>
      <h1 className='text-center mt-2 mb-0 font-bangers'>{statusText()}</h1>
    </div>
  );
};

export default StatusBar;
