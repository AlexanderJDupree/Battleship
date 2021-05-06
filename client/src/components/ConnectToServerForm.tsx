import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { validateUsername } from 'common/lib/details';

interface ConnectToServerProps {
  onValidated: (username: string) => void;
  disabled?: boolean;
}

const ConnectToServerForm: React.FC<ConnectToServerProps> = ({
  onValidated,
  disabled,
}) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [label, setLabel] = useState(<>Connect</>);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    event.stopPropagation();

    let status = validateUsername(username);
    if (!username || username === '') {
      setError('Please choose a Username');
    } else if (status !== true) {
      setError(status);
    } else {
      setError(null);
      onValidated(username);
      setLabel(<>Connecting...</>);
    }
  };

  return (
    <Form inline onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label htmlFor='username' srOnly>
          Username
        </Form.Label>
        <Form.Control
          required
          as='input'
          type='text'
          className='mr-4 mt-4'
          id='username'
          placeholder='Choose a Username...'
          isInvalid={error != null}
          onChange={(e) => setUsername(e.target.value)}
          disabled={disabled}
        />
        <Button
          type='submit'
          className='mt-4'
          variant='primary'
          disabled={disabled}
        >
          {label}
        </Button>
        <Form.Control.Feedback type='invalid'>{error}</Form.Control.Feedback>
      </Form.Group>
    </Form>
  );
};

export default ConnectToServerForm;
