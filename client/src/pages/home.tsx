import Jumbotron from 'react-bootstrap/Jumbotron';
import { Example } from '../components';

export default function Home() {
  return (
    <div className='home'>
      <Jumbotron>
        <h1>Hello, World!</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus ab
          veniam commodi culpa neque consectetur dolor incidunt vel praesentium
          impedit, saepe dolore nam ex sapiente architecto, perferendis natus
          voluptatem consequatur? Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Nihil sed provident ratione quae debitis illum
          incidunt obcaecati esse modi deserunt, delectus natus maiores aliquid,
          placeat, mollitia voluptatum architecto eaque rem!
        </p>
        <Example />
      </Jumbotron>
    </div>
  );
}
