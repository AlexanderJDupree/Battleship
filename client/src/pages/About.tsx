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
    </div>
  );
}
