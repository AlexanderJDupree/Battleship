import {CardDeck, Card, Nav, Container, Tab, Tabs} from 'react-bootstrap';

export default function About() {
  return (
    <div>
      <h1 className='bg-info text-dark text-center pt-2 pb-2'>The Project</h1>
      <Container className="pt-4 pb-4 ">
        <p>
          playbattleship.com is a full-stack web application for playing the classic 
          strategy game, Battleship, in the browser. This application was developed as
          part of the Full-Stack Web Development course at Portland State University.
        </p>
        <p> <br></br>This application was built with the following:</p>
        <ul>
          <li>React - Front end Framework</li>
          <li>Express - Backend Server</li>
          <li>Typescript - Typed Javascript</li>
          <li>Socket.io - Web socket library</li>
          <li>Firebase - Hosting and platform service</li>
        </ul>
      </Container>

      <h2 className='bg-info text-dark text-center pt-2 pb-2'>The Project</h2>
      <CardDeck>

        <Card>
          <Card.Header>
            <Nav variant="tabs" defaultActiveKey="#about me">
              <Nav.Item >
                <Nav.Link href="#about me">About Me</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link active href="#contacts">Contacts</Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
          <Card.Img variant="top" 
            src="https://i.kym-cdn.com/entries/icons/facebook/000/022/875/Screen_Shot_2017-05-03_at_12.14.21_PM.jpg"
            alt="Katherine"
          />
          <Card.Body>
            <Card.Title>Katherine Kagawa</Card.Title>
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
              <Tab eventKey="home" title="Home">
                <p>
                  I'm in my senior year at portland state for computer science. 
                  I'm most comfortable with c++, c, java, javascript, python, and typescript. 
                  I like video games, star wars, and I have the high ground Anakin. 
                </p>
              </Tab>
              <Tab eventKey="profile" title="Profile">
                
              </Tab>
            </Tabs>
          </Card.Body>
        </Card>

        <Card>
          <Card.Img variant="top" src="holder.js/100px160" />
          <Card.Body>
            <Card.Title>Name</Card.Title>
            <Card.Text>
              Tell me about yourself
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <button className="button">
              <a href="https://www.google.com/?client=safari" className="text-decoration-none">
                Github
              </a>
            </button>
          </Card.Footer>
        </Card>
      </CardDeck>
    </div>



  );
}

/*
<section className='about'>
      <h1 className='bg-info text-dark text-center pt-2 pb-2'>The Project</h1>
      <div className='m-5'>
        <p>
          playbattleship.com is a full-stack web application for playing the classic 
          strategy game, Battleship, in the browser. This application was developed as
          part of the Full-Stack Web Development course at Portland State University.
        </p>
        <p> <br></br>This application was built with the following:</p>
        <ul>
          <li>React - Front end Framework</li>
          <li>Express - Backend Server</li>
          <li>Typescript - Typed Javascript</li>
          <li>Socket.io - Web socket library</li>
          <li>Firebase - Hosting and platform service</li>
        </ul>
      </div>
      
      <h2 className='bg-info text-dark text-center pt-1 pb-1'>Our Team</h2>
      <div className="row ml-5 mr-5">

        <div className="column">
          <div className="card">
            <img src="https://i.kym-cdn.com/entries/icons/facebook/000/022/875/Screen_Shot_2017-05-03_at_12.14.21_PM.jpg" alt="Katherine" className="w-100"/>
            <div className="p-2">
              <h2>Katherine Kagawa</h2>
              <p>
                I'm in my senior year at portland state for computer science. 
                I'm most comfortable with c++, c, java, javascript, python, and typescript. 
                I like video games, star wars, and I have the high ground Anakin. 
              </p>
              <p>kkagawa@pdx.edu</p>
              <p><button className="button"><a href="https://github.com/kkagawa88" className="text-decoration-none">Github</a></button></p>
            </div>
          </div>
        </div>

        <div className="column">
          <div className="card">
            <img src="https://via.placeholder.com/150" alt="Your name" className="w-100"/>
            <div className="container">
              <h2>Name</h2>
              <p>Some text that describes me</p>
              <p>email@pdx.edu</p>
              <p><button className="button"><a href="https://www.google.com/?client=safari" className="text-decoration-none">Github</a></button></p>
            </div>
          </div>
        </div>

        <div className="column">
          <div className="card">
            <img src="https://via.placeholder.com/150" alt="Your name" className="w-100"/>
            <div className="container">
              <h2>Name</h2>
              <p>Some text that describes me</p>
              <p>email@pdx.edu</p>
              <p><button className="button"><a href="https://www.google.com/?client=safari" className="text-decoration-none">Github</a></button></p>
            </div>
          </div>
        </div>

      </div>
    </section>
*/
