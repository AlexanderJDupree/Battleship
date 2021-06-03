import React, {
  useCallback,
  useRef,
  useContext,
  useState,
  useEffect,
} from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Server, Client } from 'common/lib/events';
import { SocketContext, RoomContext } from '../contexts';
import { ServerName } from 'common/lib/details';

interface Message {
  username: string;
  msg: string;
}

const ChatMessage: React.FC<Message> = ({ username, msg }) => {
  const socket = useContext(SocketContext);

  let messageClass = username === socket.username ? 'sent' : 'received';
  let senderClass = username === ServerName ? 'server-msg' : 'chat-username';

  return (
    <li className={`chat-message ${messageClass}`}>
      <span>
        <span className={`${senderClass} font-bangers`}>{username}</span>
      </span>
      <span className='mx-1'>:</span>
      <span>{msg}</span>
    </li>
  );
};

const ChatWindow = () => {
  const roomID = useContext(RoomContext);
  const socket = useContext(SocketContext);
  const [disabled, setDisabled] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      username: ServerName,
      msg: `Game ID - ${roomID}`,
    },
    {
      username: ServerName,
      msg: 'Type "forfeit" to resign from game',
    },
  ]);

  const messageEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (message.toLowerCase() === 'forfeit') {
      socket.emit(Client.Resign, roomID);
    } else {
      socket.emit(Client.ChatMessage, roomID, message);
    }

    setMessage('');
  };

  const handleChatMessage = useCallback(
    (message) => {
      setMessages([...messages, message]);
    },
    [messages]
  );

  const handleConnect = useCallback(() => {
    if (roomID !== 'unknown') {
      setDisabled(false);
    }
  }, [roomID]);

  useEffect(() => {
    scrollToBottom();
    socket.on(Server.ChatMessage, handleChatMessage);
    socket.on(Server.Connect, handleConnect);
    if (roomID === 'unknown' || !socket.connected) {
      setDisabled(true);
    }
    return () => {
      socket.off(Server.ChatMessage, handleChatMessage);
      socket.off(Server.Connect, handleConnect);
    };
  }, [messages, handleChatMessage, handleConnect, roomID, socket]);

  return (
    <Container fluid='md' className='chat p-3'>
      <div className='chat-window border'>
        <ul className='chat-messages p-0 m-0'>
          {messages &&
            messages.map((msg, i) => <ChatMessage key={i} {...msg} />)}

          <div ref={messageEndRef}></div>
        </ul>
        <Form onSubmit={handleSubmit} className='w-100 d-flex mt-0'>
          <Form.Label htmlFor='message' srOnly>
            Message
          </Form.Label>
          <Form.Control
            as='input'
            type='text'
            className='chat-input'
            value={message}
            disabled={disabled}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={
              disabled
                ? `Can't connect to game room...`
                : 'Say something nice 😄'
            }
          />
          <Button
            type='submit'
            variant='primary'
            className='chat-submit'
            disabled={message === '' || disabled}
          >
            Send
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default ChatWindow;
