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

      <h2 className='bg-info text-dark text-center pt-2 pb-2'>About Us</h2>
      <CardDeck className="pl-3 pr-3">
        <Card>
              <Nav.Item >
                <Nav.Link href="#about me">About Me</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link active href="#contacts">Contacts</Nav.Link>
          <Card.Header as="h5">
            Katherine Kagawa
          </Card.Header>
          <Card.Img 
            variant="top" 
            src="https://i.kym-cdn.com/entries/icons/facebook/000/022/875/Screen_Shot_2017-05-03_at_12.14.21_PM.jpg"
            alt="Profile picture of Katherine"
          />
          <Card.Body>
            <Tabs defaultActiveKey="" id="uncontrolled-tab-example">
              <Tab eventKey="home" title="Home">
                <p className="pt-3">
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
          <Card.Header as="h5">
            Your Name
          </Card.Header>
          <Card.Img 
            variant="top" 
            src=""
            alt="Profile picture of ---"
          />
          <Card.Body>
            <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
              <Tab eventKey="home" title="Home">
                <p className="pt-3">
                  
                </p>
              </Tab>
              <Tab eventKey="profile" title="Profile">

              </Tab>
            </Tabs>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header as="h5">
            Your Name
          </Card.Header>
          <Card.Img 
            variant="top" 
            src=""
            alt="Profile picture of ---"
          />
          <Card.Body>
            <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
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

      </CardDeck>
    </div>


  );
}
