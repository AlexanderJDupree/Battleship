import React, { useEffect, useRef, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';

interface Message {
  username: string;
  msg: string;
}

const ChatMessage: React.FC<Message> = ({ username, msg }) => {
  let messageClass = username === 'rick' ? 'sent' : 'received';

  return (
    <div className={`chat-message mx-3 p-1 d-flex ${messageClass}`}>
      <p className='chat-username'>{username}</p>
      <p>:</p>
      <p>{msg}</p>
    </div>
  );
};

const ChatWindow = () => {
  const messageEndRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setMessages([...messages, { username: 'rick', msg: message }]);

    setMessage('');
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Container fluid='md' className='chat-window border p-0'>
      <section className='chat-messages'>
        {messages && messages.map((msg, i) => <ChatMessage key={i} {...msg} />)}

        <div ref={messageEndRef}></div>
      </section>
      <Form onSubmit={handleSubmit} className='w-100 d-flex mt-4'>
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
  return (
    <div className='game'>
      <h1 className='text-center'>Game</h1>
      <ChatWindow />
    </div>
  );
};

export default Game;
