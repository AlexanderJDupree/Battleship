import {
  Jumbotron,
  Card,
  CardDeck,
  Container,
  ListGroup,
} from 'react-bootstrap';
import {
  ServerStats,
  Leaderboard,
  MatchMakingGroup,
  Footer,
} from '../components';

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
          <MatchMakingGroup />
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
              <ListGroup.Item>1. Place your ships on the board</ListGroup.Item>
              <ListGroup.Item>2. Press "READY UP!" when done</ListGroup.Item>
              <ListGroup.Item>3. On your turn, take shots on your opponent's board to the right</ListGroup.Item>
              <ListGroup.Item>4. The last player with ships on their board wins!</ListGroup.Item>
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
      <Footer />
    </div>
  );
}

/*
 */
