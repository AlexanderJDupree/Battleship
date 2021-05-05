import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { validateUsername } from 'common/lib/details';

interface SelectUsernameProps {
  onValidated: (username: string) => void;
  label?: string;
  disabled?: boolean;
}

const SelectUsername: React.FC<SelectUsernameProps> = ({
  onValidated,
  label,
  disabled,
}) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    event.stopPropagation();

    let status = validateUsername(username);

    if (!username || username === '') {
      setError('Please Choose a Username');
    } else if (status !== true) {
      setError(status);
    } else {
      setError('');
      setValidated(status);
      onValidated(username);
    }
  };

  return (
    <Form inline validated={validated} onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label htmlFor='username' srOnly>
          Username
        </Form.Label>
        <Form.Control
          as='input'
          type='text'
          className='mr-4 mt-4'
          id='username'
          placeholder='Choose a Username...'
          isInvalid={error !== ''}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button
          type='submit'
          className='mt-4'
          variant='primary'
          disabled={disabled || validated}
        >
          {label ? label : 'Submit'}
        </Button>
        <Form.Control.Feedback type='invalid'>{error}</Form.Control.Feedback>
      </Form.Group>
    </Form>
  );
};

export default SelectUsername;
