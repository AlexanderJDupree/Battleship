import {Card, Tab, Tabs, Button } from 'react-bootstrap';

function Profile_alex() {
    
    return (
        <Card className="mt-3 mb-3 card">
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
                    <Tab eventKey="about-me" 
                        title="About Me">
                        <p className="pt-4">
                            Write some stuff about you
                        </p>
                    </Tab>
                    <Tab id="contacts" eventKey="contact" title="Contacts">
                        <div className="pt-4">
                            <p>
                                Email: <br/>
                                Look at my github to see some of my other projects! 
                            </p>
                            <div className="d-flex justify-content-center">
                                <Button variant="outline-info">
                                    <a href="https://github.com/jmcarlson0320">
                                        Check it out!
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

export default Profile_alex;