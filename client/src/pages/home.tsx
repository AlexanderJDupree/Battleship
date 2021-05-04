import { useContext, useCallback } from 'react';
import { Button, Card, CardDeck, Container, ListGroup } from 'react-bootstrap';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { ServerStats, Leaderboard, SelectUsername } from '../components';
import { SocketContext } from '../contexts';

export default function Home() {
  const socket = useContext(SocketContext);

  const handleConnect = useCallback(() => {
    if (!socket.connected) {
      socket.auth = { username: 'bob' };
      socket.connect();
    }
  }, [socket]);

  return (
    <div className='home'>
      <Jumbotron>
        <Container>
          <h1 className='display-4'>Welcome,</h1>
          <p className='lead'>
            Play the classic strategy game of Battleship right here in your
            browser
          </p>
          <hr className='mb-4' />
          <blockquote className='blockquote'>
            <p className='lead mb-0'>random naval battlefact</p>
          </blockquote>
          <SelectUsername />
        </Container>
      </Jumbotron>
      <Container>
        <CardDeck>
          {/* Rules Card */}
          <Card className='shadow'>
            <Card.Header
              as='h5'
              className='font-weight-bold text-center bg-theme-primary-light theme-text-primary'
            >
              Rules
            </Card.Header>
            <ListGroup variant='flush'>
              <ListGroup.Item>1. setup board</ListGroup.Item>
              <ListGroup.Item>2. take turns shooting stuff</ListGroup.Item>
              <ListGroup.Item>3. TODO add actual rules</ListGroup.Item>
            </ListGroup>
          </Card>

          {/* Leaderboard Card */}
          <Card className='shadow'>
            <Card.Header
              as='h5'
              className='font-weight-bold text-center bg-theme-secondary theme-text-secondary'
            >
              Leaderboard
            </Card.Header>
            <Leaderboard striped hover size='sm' bordered />
          </Card>

          {/* Site Stats Card */}
          <Card className='shadow'>
            <Card.Header
              as='h5'
              className='font-weight-bold text-center bg-theme-primary-light theme-text-primary'
            >
              Site Stats
            </Card.Header>
            <ServerStats variant='flush' />
          </Card>
        </CardDeck>
      </Container>
    </div>
  );
}

/*
          <Button variant='outline-primary' size='lg' className='mr-4 mt-3'>
            Find Game
          </Button>
          <Button
            variant='outline-success'
            size='lg'
            className='mr-4 mt-3'
            onClick={handleConnect}
          >
            Join Game
          </Button>
          */
