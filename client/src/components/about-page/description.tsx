import { Container } from 'react-bootstrap';


function Description() {
    
    return (

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
    );
}

export default Description;