"use client"
import React, { useEffect, useRef } from 'react';
import './footer.css';

const Footer = () => {

  return (
    <div>
      <section className="contact-area footer1" id="contact" >
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3 mt-5">
              <div className="contact-content text-center">
            <div className="d-flex justify-content-center">
            <img src="/Logo/logoImg.png" alt="logo"  />
            </div>
                <p className='text-center'>Design Plus Calicut Kerala</p>
                <div className="hr"></div>
                <h6>Designplus, 3rd Floor, Shah arcade
                  Providence College Jn, NH 66 Bypass Malaparamba</h6>
                              <div className="contact-social mb-3">
      <div className="phone-numbers d-flex justify-content-center">
                <i className="fa-solid fa-phone mr-2"></i> <h6 className="mr-3">0495 371199</h6>
                  <h6 className="mr-3">9562371199</h6>
                  <h6 className="mr-3">9539371198</h6>
                  <h6>9539262428</h6>
                </div>

                  <ul>
                    <li><a className="hover-target" href="https://www.facebook.com/designpluskozhikode/"><i className="fab fa-facebook-f"></i></a></li>
                    <li><a className="hover-target" href="https://www.linkedin.com/in/designplus-architects-calicut-03826a188/?"><i className="fab fa-linkedin-in"></i></a></li>
                    <li><a className="hover-target" href="https://www.instagram.com/designpluskozhikode/?hl=en"><i className="fa-brands fa-instagram"></i></a></li>
                    <li><a className="hover-target" href="https://in.pinterest.com/designplusarchitectscalicut/"><i className="fab fa-pinterest-p"></i></a></li>
                  </ul>                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* =============== 1.9 Contact Area End ====================*/}
      {/* =============== 1.9 Footer Area Start ====================*/}
      <footer>
        <div className="lastFooter">
          <p className='text-center pt-2'>Copyright &copy; 2023 All Rights Reserved.</p>
        </div>
      </footer>

    </div>
  )
}

export default Footer