import {Button } from 'react-bootstrap';
//import { useWindowDimensions } from '../hooks';

export default function Footer() {
  //const dimensions = useWindowDimensions();

  // TODO magic number, attempting to make the navbar non-fixed on smaller
  // screens here. This is what I came up with but it's mostly a hack.
  return (  
    <div className="mt-5 footer">
      <footer className="page-footer font-small bg-dark text-white">
        <div className="container">

          <div className="row text-center d-flex justify-content-center pt-5 mb-3">
            <div className="col-md-2 mb-3">
              <h6 className="text-uppercase font-weight-bold">
                <a href="https://playbattleship.com/">
                  Home
                </a>
              </h6>
            </div>
            <div className="col-md-2 mb-3">
              <h6 className="text-uppercase font-weight-bold">
                <a href="https://playbattleship.com/about">
                  About
                </a>
              </h6>
            </div>
          </div>

          <hr className="hr_part rgba-white-light"/>

          <div className="row d-flex text-center justify-content-center mb-md-0 mb-4">
            <div className="col-md-8 col-12 mt-5">
              <h5 className="text-uppercase text font-weight-bold">
                The Project
              </h5>
              <p className="foot_summary font-weight-light mt-3 col-lg-12 col-md-2">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio magnam sint, quae architecto rerum qui ea culpa, illum, nesciunt nihil minus maiores. Quos praesentium illo quae perferendis eveniet id rem.
              </p>
            </div>
          </div>

          <hr className="hr_part rgba-white-light mt-5 mb-5"/>

          <h6 className="text-uppercase text-center font-weight-bold mb-3">
            Follow us on github!
          </h6>

          <section className="row d-flex text-center justify-content-center mb-md-0">
            <div className="mt-2 col-lg-2 col-md-2 mb-4 mb-md-0">
              <Button variant="outline-info bg-image">
                <a href="https://github.com/jmcarlson0320">
                  <img
                    src="https://mdbootstrap.com/img/new/fluid/city/113.jpg"
                    alt="Katherine"
                    className="w-100"
                  />
                </a>
              </Button>
              <p>
                Katherine
              </p>
            </div>

            <div className="mt-2 col-lg-2 col-md-2 mb-4 mb-md-0">
              <Button variant="outline-info bg-image">
                <a href="https://github.com/jmcarlson0320">
                  <img
                    src="https://mdbootstrap.com/img/new/fluid/city/113.jpg"
                    alt="Katherine"
                    className="w-100"
                  />
                </a>
              </Button>
              <p>
                Katherine
              </p>
            </div>

            <div className="mt-2 col-lg-2 col-md-2 mb-4 mb-md-0">
              <Button variant="outline-info bg-image">
                <a href="https://github.com/jmcarlson0320">
                  <img
                    src="https://mdbootstrap.com/img/new/fluid/city/113.jpg"
                    alt="Katherine"
                    className="w-100"
                  />
                </a>
              </Button>
              <p>
                Katherine
              </p>
            </div>
          </section>

        </div>
      </footer>
  
  </div>

  );
}
