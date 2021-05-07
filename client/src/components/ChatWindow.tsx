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

interface Message {
  username: string;
  msg: string;
}

const ChatMessage: React.FC<Message> = ({ username, msg }) => {
  const socket = useContext(SocketContext);

  let messageClass = username === socket.username ? 'sent' : 'received';

  return (
    <li className={`chat-message ${messageClass}`}>
      <span>
        [<span className='chat-username'>{username}</span>]
      </span>
      <span className='mx-1'>:</span>
      <span>{msg}</span>
    </li>
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
      <ul className='chat-messages p-0 m-0'>
        {messages && messages.map((msg, i) => <ChatMessage key={i} {...msg} />)}

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

export default ChatWindow;
