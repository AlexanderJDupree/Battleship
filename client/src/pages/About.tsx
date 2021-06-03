<<<<<<< HEAD
import {CardDeck, Jumbotron} from 'react-bootstrap';
import Description from '../components/about-page/description';
import ProfileAlex from '../components/about-page/ProfileAlex';
import ProfileKat from '../components/about-page/ProfileKat';
import ProfileJcarlson from '../components/about-page/ProfileJcarlson';

export default function About() {
  return (
    <div>
      <h1 className=' bg-info text-dark text-center pt-2 pb-2'>
        The Project
      </h1>
      <Description/>

      <h2 className='bg-info text-dark text-center pt-2 pb-2 mb-0'>
        About us
      </h2>
      <Jumbotron className="battleship-image mt-0 mb-0 rounded-0 ">
        <CardDeck>
          <ProfileAlex/>
          <ProfileJcarlson/>
          <ProfileKat/>
        </CardDeck>
      </Jumbotron>
=======
import { Footer } from '../components';

export default function About() {
  return (
    <div className='about text-center'>
      <h1 className='bg-info text-dark text-center'>About</h1>
      <p>
        This website was a term project for CS465P Intro to Fullstack at Portland State University, Spring 2021
      </p>
      <br/>
      <h2>Alex DuPree</h2>
      <p>
        adupree@pdx.edu
      </p>
      <h2>Katherine Kagawa</h2>
      <p>
        jmc34@pdx.edu
      </p>
      <h2>Josh Carlson</h2>
      <p>
        jmc34@pdx.edu
      </p>
      <Footer />
>>>>>>> footer
    </div>
  );
}