import {Card, Tab, Tabs, Button } from 'react-bootstrap';

function Profile_kat() {
    
    return (
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
                            <a href="https://github.com/jmcarlson0320">
                                <p>
                                    Check it out! 
                                </p>
                                <i className="fa fa-github"/>
                            </a>
                        </Button>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </section>
        </Card.Body>
    </Card>

    );
}

export default Profile_kat;