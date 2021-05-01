import { Card, CardDeck, Container, ListGroup } from 'react-bootstrap';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { ServerStats, Leaderboard } from '../components';
import Button from 'react-bootstrap/Button';

export default function Home() {
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
          <Button variant='outline-primary' size='lg' className='mr-4 mt-3'>
            Find Game
          </Button>
          <Button variant='outline-success' size='lg' className='mr-4 mt-3'>
            Join Game
          </Button>
        </Container>
      </Jumbotron>
      <Container>
        <CardDeck>
          {/* Rules Card */}
          <Card className='shadow'>
            <Card.Header as='h5' className='font-weight-bold'>
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
            <Leaderboard striped hover size='sm' />
            <Card.Footer>
              <small className='text-muted'>Last updated 3 mins ago</small>
            </Card.Footer>
          </Card>

          {/* Site Stats Card */}
          <Card className='shadow'>
            <Card.Header as='h5' className='font-weight-bold'>
              Site Stats
            </Card.Header>
            <ServerStats variant='flush' />
          </Card>
        </CardDeck>
      </Container>
    </div>
  );
}
