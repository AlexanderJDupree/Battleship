import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SelectUsername = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (!username || username === '') {
      setError('Please Choose a Username');
    } else if (username.length > 30) {
      setError('Name is over 30 characters');
    }
    // Add any other validation logic here
    else {
      setError('');
      setValidated(true);
    }
  };

  return (
    <Form inline validated={validated} onSubmit={handleSubmit}>
      <Form.Group controlId='selectUsername.username'>
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
        <Button type='submit' className='mt-4' variant='primary'>
          Connect
        </Button>
        <Form.Control.Feedback type='invalid'>{error}</Form.Control.Feedback>
      </Form.Group>
    </Form>
  );
};

export default SelectUsername;
