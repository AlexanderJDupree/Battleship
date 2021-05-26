import {CardDeck, Card, Container, Tab, Tabs } from 'react-bootstrap';

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

    <div className="cards">
      <div className="card mr-2">
        <img className="card-img-top" src="https://i.kym-cdn.com/entries/icons/facebook/000/022/875/Screen_Shot_2017-05-03_at_12.14.21_PM.jpg" alt="Card image top"/>
        <div className="card-body">
          <h3 className="card-title">Card title</h3>
            <Tabs className="content" defaultActiveKey="about-me" id="uncontrolled-tab-example">
              <Tab eventKey="about-me" title="About Me">
                <p className="pt-4">
                  I'm in my senior year at portland state for computer science. 
                  I'm most comfortable with c++, c, java, javascript, python, and typescript. 
                  I like video games, star wars, and I have the high ground Anakin. 
                </p>
              </Tab>
              <Tab eventKey="contact" title="Contacts">
                <p>hi</p>
              </Tab>
            </Tabs>
        </div>
      </div>
      <div className="card mr-2">
        <img className="card-img-top" src="https://source.unsplash.com/daily" alt="Card image top"/>
        <div className="card-body">
          <h3 className="card-title">Card title</h3>
            <Tabs className="content" defaultActiveKey="about-me" id="uncontrolled-tab-example">
              <Tab eventKey="about-me" title="About Me">
                <p className="pt-4">
                  I'm in my senior year at portland state for computer science. 
                  I'm most comfortable with c++, c, java, javascript, python, and typescript. 
                  I like video games, star wars, and I have the high ground Anakin. 
                </p>
              </Tab>
              <Tab eventKey="contact" title="Contacts">
                <p>hi</p>
              </Tab>
            </Tabs>
        </div>
      </div>
      <div className="card">
        <img className="card-img-top" src="https://source.unsplash.com/daily" alt="Card image top"/>
        <div className="card-body">
          <h3 className="card-title">Card title</h3>
            <Tabs className="content" defaultActiveKey="about-me" id="uncontrolled-tab-example">
              <Tab eventKey="about-me" title="About Me">
                <p className="pt-4">
                  I'm in my senior year at portland state for computer science. 
                  I'm most comfortable with c++, c, java, javascript, python, and typescript. 
                  I like video games, star wars, and I have the high ground Anakin. 
                </p>
              </Tab>
              <Tab eventKey="contact" title="Contacts">
                <p>hi</p>
              </Tab>
            </Tabs>
        </div>
      </div>
      </div>



      <h2 className='bg-info text-dark text-center pt-2 pb-2'>About Us</h2>
      <div className="cards">
        <div className="card">
          <header>
            <h5 className="card-title">
              Card title
            </h5>
          </header>
          <img className="card-img-top" 
            id="profile" 
            src="https://i.kym-cdn.com/entries/icons/facebook/000/022/875/Screen_Shot_2017-05-03_at_12.14.21_PM.jpg"
            alt="Profile picture of Katherine"
         />
          <div className="card-body">
            <Tabs className="content" defaultActiveKey="about-me" id="uncontrolled-tab-example">
              <Tab eventKey="about-me" title="About Me">
                <p className="pt-4">
                  I'm in my senior year at portland state for computer science. 
                  I'm most comfortable with c++, c, java, javascript, python, and typescript. 
                  I like video games, star wars, and I have the high ground Anakin. 
                </p>
              </Tab>
              <Tab eventKey="contact" title="Contacts">
                <p>hi</p>
              </Tab>
            </Tabs>
          </div>
        </div>

        <div className="card">
          <img className="card-img-top" src="..." alt="Card image cap"/>
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
          </div>
        </div>
        <div className="card">
          <img className="card-img-top" src="..." alt="Card image cap"/>
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
          </div>
        </div>
      </div>


      <CardDeck className="pl-3 pr-3">
        <Card >
          <Card.Header as="h5">
            Katherine Kagawa
          </Card.Header>
          <Card.Img 
            id="profile"
            variant="top" 
            src="https://i.kym-cdn.com/entries/icons/facebook/000/022/875/Screen_Shot_2017-05-03_at_12.14.21_PM.jpg"
            alt="Profile picture of Katherine"
          />
          <Card.Body>
          <section className="tabs">
            <Tabs className="extra-content" defaultActiveKey="" id="uncontrolled-tab-example">
              <Tab eventKey="about-me" title="About Me">
                <p className="pt-4">
                  I'm in my senior year at portland state for computer science. 
                  I'm most comfortable with c++, c, java, javascript, python, and typescript. 
                  I like video games, star wars, and I have the high ground Anakin. 
                </p>
              </Tab>
              <Tab eventKey="contact" title="Contacts">
                <p>hi</p>
              </Tab>
            </Tabs>
          </section>
          </Card.Body>
        </Card>
        <Card >
          <Card.Header as="h5">
            Katherine Kagawa
          </Card.Header>
          <Card.Img 
            id="profile"
            variant="top" 
            src="https://i.kym-cdn.com/entries/icons/facebook/000/022/875/Screen_Shot_2017-05-03_at_12.14.21_PM.jpg"
            alt="Profile picture of Katherine"
          />
          <Card.Body>
          <section className="tabs">
            <Tabs className="extra-content" defaultActiveKey="" id="uncontrolled-tab-example">
              <Tab eventKey="about-me" title="About Me">
                <p className="pt-4">
                  I'm in my senior year at portland state for computer science. 
                  I'm most comfortable with c++, c, java, javascript, python, and typescript. 
                  I like video games, star wars, and I have the high ground Anakin. 
                </p>
              </Tab>
              <Tab eventKey="contact" title="Contacts">
                <p>hi</p>
              </Tab>
            </Tabs>
          </section>
          </Card.Body>
        </Card>


        

      </CardDeck>
    </div>


  );
}
