import {Container, CardDeck, Card} from 'react-bootstrap';

function Login() {
    return (
    <div className="login d-flex justify-content-center mx-auto">
            <CardDeck className="">
                <Card className="">
                    <Card.Header>
                        <h3 className="text-white ">Sign In</h3>
                    </Card.Header>
                    <Card.Body>
                        <form>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <i className="fas fa-user"></i>
                                    </span>
                                </div>
                                <input type="text" className="form-control" placeholder="username"/>
                            </div>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <i className="fas fa-key"></i>
                                    </span>
                                </div>
                                <input type="password" className="form-control" placeholder="password"/>
                            </div>
                            <div className="row align-items-center remember text-white">
                                <input type="checkbox"/>
                                Remember Me
                            </div>
                            <div className="d-flex justify-content-center form-group">
                                <input type="submit" value="Login" className="btn w-50 login_btn"/>
                            </div>
                        </form>
                    </Card.Body>
                    <Card.Footer>
                        <div className="d-flex justify-content-center links">
                            <span className="text-white">Don't have an account?</span>
                            <a href="/signup">Sign Up</a>
                        </div>
                        <div className="d-flex justify-content-center">
                            <a href="/forgot-password">Forgot your password?</a>
                        </div> 
                    </Card.Footer>
                </Card>
            </CardDeck>
    </div>
    );
  }
  
  export default Login