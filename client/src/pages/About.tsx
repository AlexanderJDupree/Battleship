import {CardDeck, Card, Container, Tab, Tabs, Jumbotron, Button } from 'react-bootstrap';

/*
  Checklist for new user:
    name
    blurb about yourself
    contact information - email, github username
    link to github at github button
*/

export default function About() {
  return (
    <div>
      <h1 className=' bg-info text-dark text-center pt-2 pb-2'>The Project</h1>
      <Container className="pt-4 pb-4 ">
        <p>
          playbattleship.com is a full-stack web application for playing the classic 
          strategy game, Battleship, in the browser. This application was developed as
          part of the Full-Stack Web Development course at Portland State University.
        </p>
        <p> <br/>This application was built with the following:</p>
        <ul>
          <li>React - Front end Framework</li>
          <li>Express - Backend Server</li>
          <li>Typescript - Typed Javascript</li>
          <li>Socket.io - Web socket library</li>
          <li>Firebase - Hosting and platform service</li>
        </ul>
      </Container>

 
      <h2 className='bg-info text-dark text-center pt-2 pb-2 mb-0'>About us</h2>
      
      <Jumbotron className="battleship-image mt-0 mb-0 rounded-0">
        <CardDeck className="cards p-3">
          <Card className="card">
            <Card.Header as="h4">
              Katherine Kagawa
            </Card.Header>
            <Card.Img 
              id="profile"
              variant="top" 
              src="https://media.tenor.com/images/f100f09abc30a5e698366e354a407033/tenor.gif"
              alt="Profile picture of Katherine"
            />
            <Card.Body>
            <section className="tabs">
              <Tabs className="extra-content" defaultActiveKey="about-me" id="uncontrolled-tab-example">
                <Tab eventKey="about-me" title="About Me">
                  <p className="pt-4">
                    I'm in my senior year at portland state for computer science. 
                    I'm most comfortable with c++, c, java, javascript, python, and typescript. 
                    I like video games, star wars, and I have the high ground Anakin. 
                  </p>
                </Tab>
                <Tab id="contacts" eventKey="contact" title="Contacts">
                  <div className="pt-4">
                    <p>
                        Email: kkagawa <br/>
                        Github Username: kkagawa88<br/>
                        Look at my github to see some of my other projects!
                    </p>
                    <div className="d-flex justify-content-center">
                      <Button variant="outline-info">
                          Check it out! 
                        <i className="fa fa-github">
                          <a href="https://github.com/kkagawa88"/>  
                        </i>
                      </Button>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </section>
            </Card.Body>
          </Card>


          <Card className="card">
            <Card.Header as="h4">
              Your Name
            </Card.Header>
            <Card.Img 
              id="profile"
              variant="top" 
              src=""
              alt="Profile picture"
            />  
            <Card.Body>
            <section className="tabs">
              <Tabs className="extra-content" defaultActiveKey="about-me" id="uncontrolled-tab-example">
                <Tab eventKey="about-me" title="About Me">
                  <p className="pt-4">
                    Write some stuff about you
                  </p>
                </Tab>
                <Tab id="contacts" eventKey="contact" title="Contacts">
                  <div className="pt-4">
                    <p>
                        Email: <br/>
                        Github Username: <br/>
                        Look at my github to see some of my other projects! 
                    </p>
                    <div className="d-flex justify-content-center">
                      <Button variant="outline-info">
                          Check it out! 
                        <i className="fa fa-github">
                            <a href="https://github.com"/>
                        </i>
                      </Button>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </section>
            </Card.Body>
          </Card>

        <Card className="card">
          <Card.Header as="h4" className="text-bold">
            Your Name
          </Card.Header>
          <Card.Img 
            id="profile"
            variant="top" 
            src=""
            alt="Profile picture"
          />  
          <Card.Body>
            <section className="tabs">
              <Tabs className="extra-content" defaultActiveKey="about-me" id="uncontrolled-tab-example">
                <Tab eventKey="about-me" title="About Me">
                  <p className="pt-4">
                    Write some stuff about you
                  </p>
                </Tab>
                <Tab id="contacts" eventKey="contact" title="Contacts">
                  <div className="pt-4">
                    <p>
                        Email: <br/>
                        Github Username: <br/>
                        Look at my github to see some of my other projects! 
                    </p>
              
                    <div className="d-flex justify-content-center">
                      <Button variant="outline-info">
                          Check it out! 
                        <i className="fa fa-github">
                            <a href="https://github.com"/>
                        </i>
                      </Button>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </section>
            </Card.Body>
          </Card>
        </CardDeck>
      </Jumbotron>
    </div>
  );
}