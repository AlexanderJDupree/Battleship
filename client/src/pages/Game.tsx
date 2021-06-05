import React, { useEffect, useState, useContext, useCallback } from 'react';
import { SocketContext, RoomContext } from '../contexts';
import useQuery from '../hooks/UseQuery';
import { Server, Client } from 'common/lib/events';
import { JoinGameStatus } from 'common/lib/details';
import {
  ChatWindow,
  GameBoard,
  SetupBar,
  StatusBar,
  ShotBoard,
  Footer
} from '../components';
import {
  SHIP,
  DIR,
  PHASE,
  GridCoor,
  newShip,
  placeShip,
  canPlaceShip,
  removeShip,
  allShipsPlaced,
  isPlayersTurn,
  getPlayerState,
  GameState,
  PlayerState,
} from 'common/lib/GameLogic';
import { PlayerContext } from '../contexts/Player';
import { HoverStyle } from '../components/GameBoard';

const Game = () => {
  const [placementDir, setPlacementDir] = useState(DIR.WEST);
  const [selected, setSelected] = useState(SHIP.NONE);
  const [playerState, setPlayerState] = useState<PlayerState | null>(null);

  // TODO this is a hack to get react to re-render a component
  const [trigger, setTrigger] = useState(false);

  const socket = useContext(SocketContext);
  const query = useQuery();
  const gameID = query.get('gid');

  const handleReady = useCallback(() => {
    if (playerState && allShipsPlaced(playerState)) {
      playerState.isReady = true;
      socket.emit(Client.ReadyUp, playerState.board, gameID || 'unknown');
      setPlayerState({ ...playerState });
      return true;
    } else {
      return false;
    }
  }, [playerState, socket, gameID]);

  const handleRotate = useCallback(() => {
    setPlacementDir((dir) => (dir === DIR.NORTH ? DIR.WEST : DIR.NORTH));
  }, []);

  const handlePlayerBoardClick = useCallback(
    (pos: GridCoor) => {
      if (playerState && playerState.phase === PHASE.SETUP) {
        if (selected !== SHIP.NONE) {
          let ship = playerState.ships[selected];
          ship.orientation = placementDir;
          ship.locationOfFront = pos;
          if (placeShip(playerState.board, ship)) {
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
      if (playerState && playerState.phase === PHASE.SETUP) {
        if (selected !== SHIP.NONE) {
          let ship = newShip(selected, pos, placementDir);
          if (canPlaceShip(playerState.board, ship)) {
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

  const handleShotBoardClick = useCallback(
    (pos: GridCoor) => {
      if (
        gameID &&
        playerState &&
        isPlayersTurn(playerState) &&
        !playerState.shots.find(
          (s) => s.location.x === pos.x && s.location.y === pos.y
        )
      ) {
        socket.emit(Client.TakeShot, gameID, pos);
      }
    },
    [playerState, gameID, socket]
  );

  const handleShotBoardHover = useCallback(
    (pos: GridCoor) => {
      if (playerState && isPlayersTurn(playerState)) {
        if (
          playerState.shots.find(
            (s) => s.location.x === pos.x && s.location.y === pos.y
          )
        ) {
          return HoverStyle.Error;
        } else {
          return HoverStyle.Action;
        }
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
        if (playerState && playerState.ships[ship].placed) {
          removeShip(playerState.board, playerState.ships[ship]);
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

  const handleGameUpdate = useCallback(
    (game: GameState) => {
      if (socket.userID) {
        let player = getPlayerState(game, socket.userID);
        if (player) {
          console.log('Updated game state');
          setPlayerState(player);
        }
      }
    },
    [socket.userID]
  );

  useEffect(() => {
    socket.on(Server.UpdateGameState, handleGameUpdate);
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
        if (!playerState) {
          socket.emit(Client.GetGameState, gameID);
        }
      });
    } else {
      console.log('Invalid game id');
    }
    return () => {
      socket.off(Server.UpdateGameState, handleGameUpdate);
    };
  }, [socket, gameID, handleGameUpdate, playerState]);

  return (
    <section className='game'>
      <RoomContext.Provider value={gameID || 'unknown'}>
        {playerState && (
          <PlayerContext.Provider value={playerState}>
            <StatusBar />
            <div className='box-container'>
              <GameBoard
                onClick={handlePlayerBoardClick}
                onHover={handlePlayerBoardHover}
                gameBoard={playerState.board}
              />
              <ShotBoard
                onClick={handleShotBoardClick}
                onHover={handleShotBoardHover}
                shots={playerState.shots}
              />
            </div>
            {playerState.phase === PHASE.SETUP ? (
              !playerState.isReady ? (
                <SetupBar
                  onReady={handleReady}
                  handleRotate={handleRotate}
                  handleSelect={handleSelect}
                  selected={selected}
                  ships={playerState.ships}
                  placementDir={placementDir}
                />
              ) : (
                <p className='text-center text-info'>
                  Waiting for other player...
                </p>
              )
            ) : (
              <></>
            )}
            <ChatWindow />
          </PlayerContext.Provider>
        )}
      </RoomContext.Provider>
      <Footer />
    </section>
  );
};

export default Game;
