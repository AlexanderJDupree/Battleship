import React, { useEffect, useState, useContext, useCallback } from 'react';
import { SocketContext, RoomContext } from '../contexts';
import useQuery from '../hooks/UseQuery';
import { Client } from 'common/lib/events';
import { JoinGameStatus } from 'common/lib/details';
import { ChatWindow, GameBoard, SetupBar, StatusBar } from '../components';
import {
  GameContext,
  GamePhase,
  GameState,
  Direction,
  InitialGameState,
} from '../contexts/Game';

const Game = () => {
  const [isReady, setIsReady] = useState(false);
  const [placementDir, setPlacementDir] = useState(Direction.East);
  const [selected, setSelected] = useState('');
  const [gameState, setGameState] = useState<GameState>({
    ...InitialGameState,
  });

  const socket = useContext(SocketContext);
  const query = useQuery();
  const gameID = query.get('gid');

  const handleReady = useCallback(() => {
    // TODO submit finalized board to server
    setIsReady(true);
    setGameState({ ...gameState, phase: GamePhase.Battle });
  }, [gameState]);

  const handleRotate = useCallback(() => {
    setPlacementDir((dir) =>
      dir === Direction.North ? Direction.East : Direction.North
    );
  }, []);

  const handlePlayerBoardClick = useCallback(() => {
    if (gameState.phase === GamePhase.Setup) {
      // Do something with the board
    }
  }, [gameState]);

  const handleOpponentBoardClick = useCallback(() => {
    if (gameState.phase === GamePhase.Battle) {
      // TODO and it's THIS players turn
      setGameState({ ...gameState, turn: gameState.turn + 1 });
    }
  }, [gameState]);

  const handleSelect = useCallback(
    (ship: string) => {
      if (ship === selected) {
        setSelected('');
      } else {
        setSelected(ship);
      }
    },
    [selected]
  );

  useEffect(() => {
    if (gameID) {
      socket.emit(Client.JoinGame, gameID, (status: JoinGameStatus) => {
        switch (status) {
          case JoinGameStatus.JoinSuccess:
            console.log(`Joined Game Room: ${gameID}`);
            break;
          case JoinGameStatus.GameNotFound:
            console.log(`Game ${gameID} not found`);
            break;
          case JoinGameStatus.Error:
            console.log(`Error joining room ${gameID}`);
            break;
        }
      });
    } else {
      console.log('Invalid game id');
    }
    return () => {
      socket.emit(Client.LeaveRoom, gameID || 'unknown');
    };
  }, [query, socket, gameID]);

  return (
    <section className='game'>
      <RoomContext.Provider value={gameID || 'unknown'}>
        <GameContext.Provider value={gameState}>
          <StatusBar />
          <div className='box-container'>
            <GameBoard variant='player' onClick={handlePlayerBoardClick} />
            <GameBoard variant='opponent' onClick={handleOpponentBoardClick} />
          </div>
          {gameState.phase === GamePhase.Setup ? (
            <SetupBar
              handleReady={handleReady}
              handleRotate={handleRotate}
              handleSelect={handleSelect}
              selected={selected}
              placementDir={placementDir}
            />
          ) : (
            <></>
          )}
          <ChatWindow />
        </GameContext.Provider>
      </RoomContext.Provider>
    </section>
  );
};

export default Game;
