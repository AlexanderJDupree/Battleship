import {
  Badge,
  Card,
  CardDeck,
  Container,
  ListGroup,
  Table,
} from 'react-bootstrap';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { Example } from '../components';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  return (
    <div className='home'>
      <Jumbotron>
        <Container>
          <h1 className='display-4'>Welcome,</h1>
          <p className='lead'>
            Play the class strategy game of Battleship right here in your
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
            <Card.Body>
              <Card.Header as='h5' className='font-weight-bold'>
                Rules
              </Card.Header>
              <ListGroup variant='flush'>
                <ListGroup.Item>1. setup board</ListGroup.Item>
                <ListGroup.Item>2. take turns shooting stuff</ListGroup.Item>
                <ListGroup.Item>3. TODO add actual rules</ListGroup.Item>
                <ListGroup.Item>
                  <Example />
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>

          {/* Leaderboard Card - TODO refactor into seperate React component */}
          <Card className='shadow'>
            <Table striped hover size='sm'>
              <thead>
                <tr className='table-active'>
                  <th>User</th>
                  <th>Wins</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <FA icon={faCrown} className='leader-icon mr-2' />
                    Rick
                  </td>
                  <td>
                    <Badge variant='info'>42</Badge>
                  </td>
                </tr>
                <tr>
                  <td>Morty</td>
                  <td>
                    <Badge variant='info'>38</Badge>
                  </td>
                </tr>
                <tr>
                  <td>Beth</td>
                  <td>
                    <Badge variant='info'>32</Badge>
                  </td>
                </tr>
                <tr>
                  <td>Summer</td>
                  <td>
                    <Badge variant='info'>11</Badge>
                  </td>
                </tr>
                <tr>
                  <td>TODO</td>
                  <td>
                    <Badge variant='info'>10</Badge>
                  </td>
                </tr>
                <tr>
                  <td>Refactor</td>
                  <td>
                    <Badge variant='info'>9</Badge>
                  </td>
                </tr>
                <tr>
                  <td>This</td>
                  <td>
                    <Badge variant='info'>8</Badge>
                  </td>
                </tr>
              </tbody>
            </Table>
            <Card.Footer>
              <small className='text-muted'>Last updated 3 mins ago</small>
            </Card.Footer>
          </Card>

          {/* Site Stats Card - TODO refactor into seperate React component */}
          <Card className='shadow'>
            <Card.Body>
              <Card.Header as='h5' className='font-weight-bold'>
                Site Stats
              </Card.Header>
              <ListGroup variant='flush'>
                <ListGroup.Item>Games Played: 0</ListGroup.Item>
                <ListGroup.Item>People Playing: 1</ListGroup.Item>
                <ListGroup.Item>Visitor Count: Just you</ListGroup.Item>
                <ListGroup.Item>TODO: Make this functional</ListGroup.Item>
              </ListGroup>
              <Card.Footer>
                <small className='text-muted'>Last updated 3 mins ago</small>
              </Card.Footer>
            </Card.Body>
          </Card>
        </CardDeck>
      </Container>
    </div>
  );
}
