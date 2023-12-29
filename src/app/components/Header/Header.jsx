"use client"
import React, { useEffect, useState } from 'react';
import { Navbar, OverlayTrigger, Tooltip } from 'react-bootstrap';
import './header.css'
import Link from 'next/link';
import '../../DesignPlus/css/style.css'
import '../../styles/style.css'

const Header = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleOverlayToggle = () => {
    setIsOverlayOpen((prevIsOpen) => !prevIsOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div>
      <Navbar fixed="top" expand="lg" className={`s-header js__header-sticky js__header-overlay ${isScrolled ? 'is-scrolled' : ''}`}>
        <Navbar.Brand className="s-header__logo">
          <Link href="/" className="s-header__logo-link">
            <img
              className="s-header__logo-img s-header__logo-img-default"
              src={isScrolled ? "/Logo/1.png" : "/Logo/logodplustext.png"}
              alt=""
                       />
          </Link>
        </Navbar.Brand>

        <button
          style={{ width: '90px', marginTop:'-30px' }}
          className={` s-header__trigger js__trigger ${isScrolled ? 'is-scrolled' : ''}`}
          type="button"
          aria-controls="responsive-navbar-nav"
          aria-expanded={isOverlayOpen}
          onClick={handleOverlayToggle}
        >
          <img src="/Logo/logoImg.png" alt="" />
          <svg x="0rem" y="0rem" width="3.125rem" height="3.125rem" viewBox="0 0 54 54">
            <circle fill="transparent" stroke={isScrolled ? '#000' : '#fff'} strokeWidth="1" cx="27" cy="27" r="25" strokeDasharray="157 157" strokeDashoffset="157"></circle>
          </svg>
        </button>
      </Navbar>

      {/* Overlay */}
      <div className={`s-header-bg-overlay js__bg-overlay ${isOverlayOpen ? '-is-open' : ''}`}>

        {/* Nav */}
        <div className="row">
          <div className="col-md-4"></div>
          <div style={{ marginTop: '14%' }} className="col-md-4  d-flex justify-content-center align-items-center">
            <div>
              <img src="/Logo/logoImg1.png" style={{ opacity: '0.5' }} alt="" className='overlayImage d-flex justify-content-center' />
              <br /><p className='text-center' >DESIGN PLUS CALICUT</p>
            </div>

          </div>
          <div className="col-md-4 homeMenus" >
            <div className="row">
              <div className="col-md-6">
                <nav className=" js__scrollbar">

                  <div className="container-fluid">

                    <ul className="list-unstyled s-header__nav-menu">
                      <li className="s-header__nav-menu-item"><Link
                        className="s-header__nav-menu-link s-header__nav-menu-link-divider -is-active"
                        href="/" onClick={handleOverlayToggle}>Home</Link></li>

                      <li className="s-header__nav-menu-item"><Link
                        className="s-header__nav-menu-link s-header__nav-menu-link-divider"
                        href={`/DesignPlus/blog`} onClick={handleOverlayToggle}>Blog</Link></li>
                      <li className="s-header__nav-menu-item">
                        <Link
                          className="s-header__nav-menu-link s-header__nav-menu-link-divider"
                          href={`/DesignPlus/Portfolio`} onClick={handleOverlayToggle}> Portfolio</Link>
                      </li>

                      <li className="s-header__nav-menu-item">
                        <Link
                          className="s-header__nav-menu-link s-header__nav-menu-link-divider"
                          href={`/DesignPlus/Media`} onClick={handleOverlayToggle}> Media</Link></li>
                    </ul>

                  </div>
                </nav>
              </div>

              <div className="col-md-6">
                <nav className="">

                  <div className="container-fluid">

                    <ul className="list-unstyled s-header__nav-menu ">

                      <li className="s-header__nav-menu-item">
                        <Link
                          className="s-header__nav-menu-link s-header__nav-menu-link-divider "
                          href={`/DesignPlus/about`} onClick={handleOverlayToggle}>About
                        </Link>
                      </li>

                      <li className="s-header__nav-menu-item">
                        <Link
                          className="s-header__nav-menu-link s-header__nav-menu-link-divider "
                          href={`/DesignPlus/Categories`} onClick={handleOverlayToggle}>Projects
                        </Link>
                      </li>
                      <li className="s-header__nav-menu-item">
                        <Link
                          className="s-header__nav-menu-link s-header__nav-menu-link-divider"
                          href={`/DesignPlus/career`} onClick={handleOverlayToggle}>Career
                        </Link>
                      </li>
                      <li className="s-header__nav-menu-item">
                        <Link
                          className="s-header__nav-menu-link s-header__nav-menu-link-divider"
                          href={`/DesignPlus/contact`} onClick={handleOverlayToggle}>Contacts
                        </Link>
                      </li>
                      <li className="s-header__nav-menu-item">
                        <Link
                          className="s-header__nav-menu-link s-header__nav-menu-link-divider"
                          href={`/LandingPage`} onClick={handleOverlayToggle}>Landing page
                        </Link>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>


            <div className="d-flex justify-content-start ">
              <ul className="list-inline s-header__action s-header__action--rb">
                <li className="s-header__action-item">
                  <OverlayTrigger overlay={<Tooltip>Facebook</Tooltip>} placement="top">
                    <Link className="s-header__action-link" href="https://www.facebook.com/designpluskozhikode/">
                      <i className="g-padding-r-5--xs fa-brands fa-facebook-f me-1"></i>
                      <span className="g-display-none--xs g-display-inline-block--sm " onClick={handleOverlayToggle} >Facebook</span>

                    </Link>
                  </OverlayTrigger>
                </li>
                <li className="s-header__action-item">
                  <OverlayTrigger overlay={<Tooltip>Linkedin</Tooltip>} placement="top">
                    <Link className="s-header__action-link" href="https://www.linkedin.com/in/designplus-architects-calicut-03826a188/?">
                      <i className="fa-brands fa-linkedin-in  me-1"></i>

                      <span className="g-display-none--xs g-display-inline-block--sm" onClick={handleOverlayToggle}>Linkedin</span>
                    </Link>
                  </OverlayTrigger>
                </li>
                <li className="s-header__action-item">
                  <OverlayTrigger overlay={<Tooltip>Instagram</Tooltip>} placement="top">
                    <Link className="s-header__action-link" href="https://www.instagram.com/designpluskozhikode/?hl=en">
                      <i className="g-padding-r-5--xs fa-brands fa-instagram  me-1"></i>
                      <span className="g-display-none--xs g-display-inline-block--sm" onClick={handleOverlayToggle}>Instagram</span>
                    </Link>
                  </OverlayTrigger>
                </li>
                <li className="s-header__action-item">
                  <OverlayTrigger overlay={<Tooltip>Pintrest</Tooltip>} placement="top">
                    <Link className="s-header__action-link" href="https://in.pinterest.com/designplusarchitectscalicut/">
                      <i className="fa-brands fa-pinterest-p  me-1"></i>
                      <span className="g-display-none--xs g-display-inline-block--sm" onClick={handleOverlayToggle}>Pintrest</span>
                    </Link>
                  </OverlayTrigger>
                </li>
              </ul>
            </div>           </div>
        </div>


      </div>
      {/* End Overlay */}
    </div>
  );
};

export default Header