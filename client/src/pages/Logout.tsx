import {Button, CardDeck, Card} from 'react-bootstrap';
import { Footer} from '../components';

function Logout() {
    return (
      <div>
        <div className="logout mt-5 auth d-flex">
          <CardDeck className="mx-auto">
            <Card>
              <div className="p-3">
                <p className="text-center text-white">Are you sure you want to logout?</p>
                <div className="d-flex justify-content-center">
                  <Button variant="danger" className="w-50" >Cancel</Button>
                  <Button variant="info" className="w-50" >Logout</Button>
                </div>
              </div>
            </Card>
          </CardDeck>
        </div>
        <Footer/>
      </div>
    );
  }
  
  export default Logout