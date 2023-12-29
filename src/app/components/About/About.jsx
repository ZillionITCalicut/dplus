import React from 'react';
import './about.css';
import '../../styles/style.css';
import '../../DesignPlus/css/style.css'
import GoogleReviews from '../GoogleReviews/GoogleReviews';

const About = () => {
  return (
    <div>
      <div className="">
        <div className="we-help-section"  style={{marginBottom:'0'}}>
          <div className="container position-relative">
            <div className="row justify-content-between">
              <div className="col-lg-7 mb-5 mb-lg-0">
                <div className="imgs-grid">
                  <div className="grid grid-1"><img src="/img/project_details_one.jpg" alt="DesignPlusAboutImage1" /></div>
                  <div className="grid grid-2"><img src="/img/project_details_three.jpg" alt="DesignPlusAboutImage2" /></div>
                  <div className="grid grid-3"><img src="/img/project_details_two.jpg" alt="DesignPlusAboutImage3" /></div>
                </div>
              </div>
              <div className="col-lg-5 ps-lg-5">
                <h2 style={{ color: '#fff' }}>Turnkey specialisations supported with modern artistic approach</h2>
                <p style={{ color: '#fff' }}>Designs to elevate your living space and make your dreams come true.</p>

                {/*      <div className="list-unstyled custom-list my-4 text-center" style={{ color: '#fff' }}>
                  Architectural <span> &#124; </span>
                  Interior <span> &#124; </span>
                  Landscape <span> &#124; </span>
                  Project Management
                </div> */}
                <GoogleReviews />
              </div>
            </div>

            <div className="row mt-5 text-center ">
              <div className="col-md-4"></div>
              <div className="col-md-8">

              </div>
            </div>
          </div>
          <div className="overlay"></div>
        </div>


      </div>
    </div>
  );
}

export default About;
