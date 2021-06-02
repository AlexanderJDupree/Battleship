import {Card, Tab, Tabs, Button } from 'react-bootstrap';

function Profile_kat() {
    
    return (
        <Card className="mt-3 mb-3 card">
            <Card.Header as="h4">
              Katherine Kagawa
            </Card.Header>
            <Card.Img 
              id="profile"
              variant="top" 
              src="https://64.media.tumblr.com/be2602f7af4ef19602990106f10fabfe/972ecd9c05548a10-ec/s540x810/98e25d20aaa96ee43077b246886bf2ab8f647367.gifv"
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
                <Tab className="contacts" eventKey="contact" title="Contacts">
                  <div className="pt-4">
                    <p>
                        Email: kkagawa@pdx.edu <br/>
                        Look at my github to see some of my other projects!
                    </p>
                    <div className="d-flex justify-content-center">
                        <Button variant="outline-info">
                            <a href="https://github.com/kkagawa88">
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

export default Profile_kat;