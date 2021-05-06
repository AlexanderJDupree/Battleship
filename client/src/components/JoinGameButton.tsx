import React, { useState } from 'react';
import { Button, Spinner, Collapse, Form } from 'react-bootstrap';

interface JoinGameProps {
  onSubmit: (roomCode: string) => true | string;
  disabled: boolean;
}

const JoinGameButton: React.FC<JoinGameProps> = ({ onSubmit, disabled }) => {
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState(<>Join Game</>);

  const [roomCode, setRoomCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    event.stopPropagation();

    let status = onSubmit(roomCode); // TODO attempt to connect to room
    if (!roomCode || roomCode === '') {
      setError('Please enter a room ID');
    } else if (status !== true) {
      setError(status);
    } else {
      setError(null);
      setLabel(
        <>
          <Spinner
            as='span'
            animation='grow'
            size='sm'
            role='status'
            aria-hidden='true'
            className='mr-2 mb-1'
          />
          Joining Game!
        </>
      );
      setOpen(false);
    }
  };

  const handleClick = () => {
    setOpen(!open);
    if (!open) {
      setLabel(<>Close</>);
    } else {
      setLabel(<>Join Game</>);
    }
  };

  return (
    <>
      <Button
        variant='outline-success'
        size='lg'
        className='mr-4 mt-3'
        onClick={handleClick}
        disabled={disabled}
        aria-controls='join-game-prompt'
        aria-expanded={open}
      >
        {label}
      </Button>
      <div className='d-inline'>
        <Collapse in={open}>
          <Form inline onSubmit={handleSubmit} id='join-game-form'>
            <Form.Group>
              <Form.Label htmlFor='roomCode' srOnly>
                Room Code
              </Form.Label>
              <Form.Control
                required
                as='input'
                type='text'
                className='mr-4 mt-4'
                id='username'
                placeholder='Enter Room Code...'
                isInvalid={error != null}
                onChange={(e) => setRoomCode(e.target.value)}
                disabled={disabled}
              />
              <Button
                type='submit'
                className='mt-4'
                variant='primary'
                disabled={disabled}
              >
                Join!
              </Button>
              <Form.Control.Feedback type='invalid'>
                {error}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Collapse>
      </div>
    </>
  );
};

export default JoinGameButton;
