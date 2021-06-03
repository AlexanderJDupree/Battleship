import {Button } from 'react-bootstrap';
//import { useWindowDimensions } from '../hooks';

export default function Footer() {
  //const dimensions = useWindowDimensions();

  // TODO magic number, attempting to make the navbar non-fixed on smaller
  // screens here. This is what I came up with but it's mostly a hack.
  return (  
    <div className="mt-2 footer">
      <footer className="bg-dark text-white">
        <div className="row text-center justify-content-center pt-2 mb-3">
          <div className="col-2 mt-5">
              <h5 className="text-uppercase text font-weight-bold">
                Links
              </h5>
              <div className="mt-3 row-md-2 mb-3">
                <h6 className="text-uppercase font-weight-bold">
                  <a href="https://playbattleship.com/">
                    Home
                  </a>
                </h6>
              </div>
              <div className="row-md-2 mb-3">
                <h6 className="text-uppercase font-weight-bold text-white text-underline">
                  <a href="https://playbattleship.com/about">
                    About
                  </a>
                </h6>
              </div>
            </div>

          <div className="col-8 mt-5 text-left">
            <h5 className="text-uppercase font-weight-bold">
              The Project
            </h5>
            <p className="foot_summary  font-weight-light mt-3 ">
              This website was a term project for CS465P Intro to Fullstack at Portland State University, 
              Spring 2021. Playbattleship.com is a full-stack web application for playing the classic 
              strategy game, Battleship, in the browser.
            </p>
          </div>
        </div>

        <hr className="hr_part pb-3"/>

        <h6 className="text-uppercase text-center font-weight-bold mb-3">
          Follow us on github!
        </h6>
        <section className="pb-3 row d-flex text-center justify-content-center mb-md-0">
          
          <div className="mt-2 col-lg-2 col-md-2 mb-4 mb-md-0">
            <a className="btn btn-large btn-outline-light rounded-circle btn-floating m-1" 
              href="https://github.com/kkagawa88" 
              role="button"
            >
              <i className="fa fa-github"></i>
            </a>
            <span className="ml-2"> 
              Alex
            </span>
          </div>

          <div className="mt-2 col-lg-2 col-md-2 mb-4 mb-md-0">
            <a className="btn btn-large btn-outline-light rounded-circle btn-floating m-1" 
              href="https://github.com/AlexanderJDupree" 
              role="button"
            >
              <i className="fa fa-github"></i>
            </a>
            <span className="ml-2"> 
              Josh
            </span>
          </div>

          <div className="mt-2 col-lg-2 col-md-2 mb-4 mb-md-0">
            <a className="btn btn-large btn-outline-light rounded-circle btn-floating m-1" 
              href="https://github.com/kkagawa88" 
              role="button"
            >
              <i className="fa fa-github"></i>  
            </a>
            <span className="ml-2"> 
              Katherine
            </span>
          </div>
        </section>  

      </footer>
    </div>

  );
}
