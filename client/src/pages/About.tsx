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
      <CardDeck className="cards pl-3 pr-3">
        <Card className="card">
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
                <p>hi</p>
              </Tab>
            </Tabs>
          </Card.Body>
        </Card>

        

      </CardDeck>
    </div>


  );
}
