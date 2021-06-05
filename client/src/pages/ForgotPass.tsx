import {Button, CardDeck, Card, FormGroup} from 'react-bootstrap';
import { Footer} from '../components';

function ForgotPass() {
    return (
        <div>
            <div className="forgot-pass mt-5 auth d-flex">
                <CardDeck className="mx-auto">
                    <Card>
                        <Card.Header>
                            <h3 className="text-white">
                                <b>Forgot Password?</b>
                            </h3>
                            <p>Reset password here. A link will be sent to your email with instructions.</p>
                        </Card.Header>
                        <Card.Body>
                            <form className="">
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="fas fa-user"></i>
                                        </span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="email@ex.com"/>
                                </div>
                                <div className="mt-3 mb-2 d-flex justify-content-center form-group">
                                    <input type="submit" value="Sent Reset Link" className="btn w-50 login_btn"/>
                                </div>
                            </form>
                        </Card.Body>
                        <Card.Footer>
                            <div className="d-flex justify-content-center links">
                                <span className="text-white">
                                    Already have an account? <a href="/signin">Log in</a>
                                </span>
                            </div>
                            <div className="d-flex justify-content-center links">
                                <span className="text-white">
                                    Dont have an account? <a href="/signup">Sign Up</a>
                                </span>
                            </div>
                        </Card.Footer>
                    </Card>
                </CardDeck>
            </div>
        <Footer/>
      </div>
    );
  }
  
  export default ForgotPass