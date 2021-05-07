import React, {
  useEffect,
  useRef,
  useState,
  useContext,
  useCallback,
} from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { SocketContext } from '../contexts';
import useQuery from '../hooks/UseQuery';
import { Server, Client } from 'common/lib/events';
import { JoinGameStatus } from 'common/lib/details';

const RoomContext = React.createContext('unknown');

interface Message {
  username: string;
  msg: string;
}

const ChatMessage: React.FC<Message> = ({ username, msg }) => {
  const socket = useContext(SocketContext);

  let messageClass = username === socket.username ? 'sent' : 'received';

  return (
    <div className={`chat-message mx-3 p-1 d-flex ${messageClass}`}>
      <p className='chat-username'>{username}</p>
      <p>:</p>
      <p>{msg}</p>
    </div>
  );
};

const ChatWindow = () => {
  const roomID = useContext(RoomContext);
  const socket = useContext(SocketContext);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const messageEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    event.stopPropagation();

    socket.emit(Client.ChatMessage, roomID, message);

    setMessage('');
  };

  const handleChatMessage = useCallback(
    (message) => {
      console.log(`Chat Message: ${message}`);
      setMessages([...messages, message]);
    },
    [messages]
  );

  useEffect(() => {
    scrollToBottom();
    socket.on(Server.ChatMessage, handleChatMessage);
    return () => {
      socket.off(Server.ChatMessage, handleChatMessage);
    };
  }, [messages, socket, handleChatMessage]);

  return (
    <Container fluid='md' className='chat-window border p-0'>
      <section className='chat-messages'>
        {messages && messages.map((msg, i) => <ChatMessage key={i} {...msg} />)}

        <div ref={messageEndRef}></div>
      </section>
      <Form onSubmit={handleSubmit} className='w-100 d-flex mt-0'>
        <Form.Label htmlFor='message' srOnly>
          Message
        </Form.Label>
        <Form.Control
          as='input'
          type='text'
          className='chat-input'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder='Say something nice 😄'
        />
        <Button
          type='submit'
          variant='primary'
          className='chat-submit'
          disabled={message === ''}
        >
          Send
        </Button>
      </Form>
    </Container>
  );
};

const Game = () => {
  const [roomID, setRoomID] = useState('unknown');
  const socket = useContext(SocketContext);
  const query = useQuery();

  useEffect(() => {
    let room = query.get('host');
    if (room) {
      setRoomID(room);
      socket.emit(Client.JoinGame, room, (status: JoinGameStatus) => {
        switch (status) {
          case JoinGameStatus.GameCreated:
            console.log(`Game Created: ${room}`);
            break;

          case JoinGameStatus.JoinSuccess:
            break;

          case JoinGameStatus.RoomFull:
          case JoinGameStatus.Error:
            // TODO handle error
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
        <ChatWindow />
      </RoomContext.Provider>
    </div>
  );
};

export default Game;
