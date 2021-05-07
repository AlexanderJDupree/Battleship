import { useEffect, useState, useContext } from 'react';
import { SocketContext, RoomContext } from '../contexts';
import useQuery from '../hooks/UseQuery';
import { Client } from 'common/lib/events';
import { JoinGameStatus } from 'common/lib/details';
import { ChatWindow } from '../components';

const joinStatusToString = (status: JoinGameStatus) => {
  switch (status) {
    case JoinGameStatus.GameNotFound:
      return 'Game Not Found';

    case JoinGameStatus.Error:
      return 'Failed to Join game, an error occured';

    case JoinGameStatus.JoinSuccess:
      return 'Join Successful!';
  }
};

const Game = () => {
  const [error, setError] = useState<string | null>(null);
  const socket = useContext(SocketContext);
  const query = useQuery();

  const roomID = query.get('room');

  useEffect(() => {
    if (roomID) {
      socket.emit(Client.JoinGame, roomID, (status: JoinGameStatus) => {
        switch (status) {
          case JoinGameStatus.JoinSuccess:
            console.log(`Joined Game Room: ${roomID}`);
            break;

          case JoinGameStatus.GameNotFound:
          case JoinGameStatus.Error:
            setError(joinStatusToString(status));
            console.log(`Error joining room ${roomID}`);
            break;
        }
      });
    } else {
      setError('Error parsing room query');
    }
    return () => {
      socket.emit(Client.LeaveRoom, roomID || 'unknown');
    };
  }, [query, socket, roomID]);

  return (
    <div className='game'>
      <RoomContext.Provider value={roomID || 'unknown'}>
        <h1 className='text-center'>Game board and stuff goes here</h1>
        {error ? (
          <h2 className='text-center'>{error}</h2>
        ) : (
          <h2 className='text-center'>Room ID: {roomID}</h2>
        )}
        <ChatWindow />
      </RoomContext.Provider>
    </div>
  );
};

export default Game;
