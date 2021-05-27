import {Button } from 'react-bootstrap';
//import { useWindowDimensions } from '../hooks';

export default function Footer() {
  //const dimensions = useWindowDimensions();

  // TODO magic number, attempting to make the navbar non-fixed on smaller
  // screens here. This is what I came up with but it's mostly a hack.
  return (  

  <div>
    <div className="mt-5 footer bg-dark footer-basic">
        <footer>
          <div className="">

          </div>
            <div className="social">
              <a href="https://www.web-eau.net/blog/10-best-footer-html-css-snippets">
              <i className="icon ion-social-instagram"></i></a><a href="#"><i className="icon ion-social-snapchat"></i></a><a href="#"><i className="icon ion-social-twitter"></i></a><a href="#"><i className="icon ion-social-facebook"></i></a></div>
            <ul className="list-inline">
                <li className="list-inline-item"><a href="https://www.web-eau.net/blog/10-best-footer-html-css-snippets">Home</a></li>
                <li className="list-inline-item"><a href="https://www.web-eau.net/blog/10-best-footer-html-css-snippets">Services</a></li>
                <li className="list-inline-item"><a href="https://www.web-eau.net/blog/10-best-footer-html-css-snippets">About</a></li>
                <li className="list-inline-item"><a href="https://www.web-eau.net/blog/10-best-footer-html-css-snippets">Terms</a></li>
                <li className="list-inline-item"><a href="https://www.web-eau.net/blog/10-best-footer-html-css-snippets">Privacy Policy</a></li>
            </ul>
            <p className="copyright">Company Name © 2018</p>
        </footer>
    </div>
  </div>

  );
}
