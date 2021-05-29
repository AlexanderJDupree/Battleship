import React, { useEffect, useState, useContext, useCallback } from 'react';
import { SocketContext, RoomContext } from '../contexts';
import useQuery from '../hooks/UseQuery';
import { Client } from 'common/lib/events';
import { JoinGameStatus } from 'common/lib/details';
import { ChatWindow, GameBoard, SetupBar, StatusBar } from '../components';
import {
  SHIP,
  DIR,
  PHASE,
  PLAYER,
  GridCoor,
  newShip,
  placeShip,
  canPlaceShip,
  removeShip,
  newPlayerState,
  allShipsPlaced,
  isPlayersTurn,
} from 'common/lib/GameLogic';
import { PlayerContext } from '../contexts/Player';
import { HoverStyle } from '../components/GameBoard';

const Game = () => {
  const [placementDir, setPlacementDir] = useState(DIR.WEST);
  const [selected, setSelected] = useState(SHIP.NONE);
  const [playerState, setPlayerState] = useState(
    newPlayerState(PLAYER.PLAYER_1)
  );

  // TODO this is a hack to get react to re-render a component
  const [trigger, setTrigger] = useState(false);

  const socket = useContext(SocketContext);
  const query = useQuery();
  const gameID = query.get('gid');

  const handleReady = useCallback(() => {
    if (allShipsPlaced(playerState)) {
      // TODO submit finalized board to server
      playerState.phase = PHASE.PLAYER1_TURN;
      setPlayerState(playerState);
      setTrigger(!trigger);
      return true;
    } else {
      return false;
    }
  }, [playerState, trigger]);

  const handleRotate = useCallback(() => {
    setPlacementDir((dir) => (dir === DIR.NORTH ? DIR.WEST : DIR.NORTH));
  }, []);

  const handlePlayerBoardClick = useCallback(
    (pos: GridCoor) => {
      if (playerState.phase === PHASE.SETUP) {
        if (selected !== SHIP.NONE) {
          let ship = playerState.ships[selected];
          ship.orientation = placementDir;
          ship.locationOfFront = pos;
          if (placeShip(playerState.setupBoard, ship)) {
            setPlayerState(playerState);
            setSelected(SHIP.NONE);
          }
        }
      }
    },
    [playerState, selected, placementDir]
  );

  const handlePlayerBoardHover = useCallback(
    (pos: GridCoor) => {
      if (playerState.phase === PHASE.SETUP) {
        if (selected !== SHIP.NONE) {
          let ship = newShip(selected, pos, placementDir);
          if (canPlaceShip(playerState.setupBoard, ship)) {
            return HoverStyle.Action;
          } else {
            return HoverStyle.Error;
          }
        }
        return HoverStyle.Default;
      }
      return HoverStyle.None;
    },
    [playerState, placementDir, selected]
  );

  const handleOpponentBoardClick = useCallback(
    (pos: GridCoor) => {
      if (
        playerState.phase === PHASE.PLAYER1_TURN ||
        playerState.phase === PHASE.PLAYER2_TURN
      ) {
      }
    },
    [playerState]
  );

  const handleOpponentBoardHover = useCallback(
    (pos: GridCoor) => {
      if (isPlayersTurn(playerState)) {
        return HoverStyle.Default;
      }
      return HoverStyle.None;
    },
    [playerState]
  );

  const handleSelect = useCallback(
    (ship: SHIP) => {
      if (ship === selected) {
        setSelected(SHIP.NONE);
      } else {
        if (playerState.ships[ship].placed) {
          removeShip(playerState.setupBoard, playerState.ships[ship]);
          setPlayerState(playerState);
          setSelected(SHIP.NONE);
          setTrigger(!trigger);
        } else {
          setSelected(ship);
        }
      }
    },
    [selected, playerState, trigger]
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
        <PlayerContext.Provider value={playerState}>
          <StatusBar />
          <div className='box-container'>
            <GameBoard
              variant='player'
              onClick={handlePlayerBoardClick}
              onHover={handlePlayerBoardHover}
              gameBoard={playerState.setupBoard}
            />
            <GameBoard
              variant='opponent'
              onClick={handleOpponentBoardClick}
              onHover={handleOpponentBoardHover}
              gameBoard={playerState.setupBoard}
            />
          </div>
          {playerState.phase === PHASE.SETUP ? (
            <SetupBar
              onReady={handleReady}
              handleRotate={handleRotate}
              handleSelect={handleSelect}
              selected={selected}
              ships={playerState.ships}
              placementDir={placementDir}
            />
          ) : (
            <></>
          )}
          <ChatWindow />
        </PlayerContext.Provider>
      </RoomContext.Provider>
    </section>
  );
};

export default Game;
