import {CardDeck, Card} from 'react-bootstrap';

function SignUp() {
  return (

    <div className="mt-5 auth d-flex">
        <CardDeck className="mx-auto">
            <Card>
                <Card.Header>
                    <h3 className="text-white">
                        <b>Sign Up</b>
                    </h3>
                </Card.Header>
                <Card.Body>
                    <form className="">
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
                        <div className="input-group form-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="fas fa-key"></i>
                                </span>
                            </div>
                            <input type="confirm-password" className="form-control" placeholder="confirm password"/>
                        </div>
                        <div className="row align-items-center remember text-white">
                            <input type="checkbox"/>
                            Remember Me
                        </div>
                        <div className="mt-3 mb-2 d-flex justify-content-center form-group">
                            <input type="submit" value="Login" className="btn w-50 login_btn"/>
                        </div>
                    </form>
                </Card.Body>
                <Card.Footer>
                    <div className="d-flex justify-content-center links">
                        <span className="text-white">
                            Already have an account? <a href="/signin">Log in</a>
                        </span>
                    </div>
                </Card.Footer>
            </Card>
        </CardDeck>
    </div>
  );
}

export default SignUp