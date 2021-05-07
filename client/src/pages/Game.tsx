import { useEffect, useState, useContext } from 'react';
import { SocketContext, RoomContext } from '../contexts';
import useQuery from '../hooks/UseQuery';
import { Client } from 'common/lib/events';
import { JoinGameStatus } from 'common/lib/details';
import { ChatWindow } from '../components';

const Game = () => {
  const [roomID, setRoomID] = useState('unknown');
  const [joinStatus, setJoinStatus] = useState(JoinGameStatus.JoinSuccess);
  const socket = useContext(SocketContext);
  const query = useQuery();

  useEffect(() => {
    let room = query.get('host');
    if (room) {
      setRoomID(room);
      socket.emit(Client.JoinGame, room, (status: JoinGameStatus) => {
        setJoinStatus(status);
        switch (status) {
          case JoinGameStatus.GameCreated:
            console.log(`Game Created: ${room}`);
            break;

          case JoinGameStatus.JoinSuccess:
            console.log(`Joined Game Room: ${room}`);
            break;

          case JoinGameStatus.Error:
            console.log(`Error joining room ${roomID}`);
            break;
        }
      });
    } else {
      // TODO handle error
    }
  }, [query, socket, roomID]);

  return (
    <div className='game'>
      <RoomContext.Provider value={roomID}>
        <h1 className='text-center'>Game board and stuff goes here</h1>
        {joinStatus === JoinGameStatus.Error ? (
          <h2 className='text-center'>Join error</h2>
        ) : (
          <h2 className='text-center'>Room ID: {roomID}</h2>
        )}
        <ChatWindow />
      </RoomContext.Provider>
    </div>
  );
};

export default Game;
