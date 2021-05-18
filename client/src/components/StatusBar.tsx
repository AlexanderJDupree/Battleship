import { useContext } from 'react';
import { GameContext, GamePhase } from '../contexts/Game';

const StatusBar = () => {
  const gameState = useContext(GameContext);

  let statusText = () => {
    switch (gameState.phase) {
      case GamePhase.Setup:
        return 'Place Your Ships';
      case GamePhase.Battle:
        if (gameState.turn % 2 === 0) {
          return 'Your Turn';
        } else {
          return 'Opponents Turn';
        }
      case GamePhase.Won:
        return 'You Won!';
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
