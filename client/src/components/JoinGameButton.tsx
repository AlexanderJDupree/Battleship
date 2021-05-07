import React, { useContext, useState } from 'react';
import { Button, Spinner, Collapse, Form } from 'react-bootstrap';
import { SocketContext } from '../contexts';
import { Client } from 'common/lib/events';
import { RoomStatus } from 'common/lib/details';

interface JoinGameProps {
  onValidated: (roomCode: string) => void;
  disabled: boolean;
}

const JoinGameButton: React.FC<JoinGameProps> = ({ onValidated, disabled }) => {
  const socket = useContext(SocketContext);
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState(<>Join Game</>);
  const [roomCode, setRoomCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    event.stopPropagation();

    socket.emit(Client.CheckRoom, roomCode, (status) => {
      switch (status) {
        case RoomStatus.Ok:
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
          onValidated(roomCode);
          break;
        case RoomStatus.NotFound:
          setError('Room not found');
          break;

        case RoomStatus.RoomFull:
          setError('Room is full');
          break;
      }
    });
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
        variant='outline-info'
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
                onChange={(e) => {
                  setRoomCode(e.target.value);
                  setError(null);
                }}
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
