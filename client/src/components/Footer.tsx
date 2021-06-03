
export default function Footer() {
  return (  
    <div className="mt-2 footer">
      <footer className="bg-theme-secondary-dark text-white">
        <div className="row text-center justify-content-center pt-2 mb-3">

        </div>

        <h6 className="text-uppercase text-center font-weight-bold mb-3">
          Follow us on github!
        </h6>
        <hr className="hr_part pb-3"/>

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
