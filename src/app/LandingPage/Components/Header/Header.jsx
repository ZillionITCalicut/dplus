"use client"
import React, { useEffect, useState } from 'react';
import '../../style2.css'

const Header = () => {
  const [isHeaderFixed, setHeaderFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setHeaderFixed(scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <header id="header" className={isHeaderFixed ? 'fixed-header' : ''}>
        <div className="container">
          <div id="logo" className="pull-left">
            <a href="#hero">
              <img src="/Logo/logodplustext.png" alt="" title="" style={{height:'30px'}} />
            </a>
          </div>
          <nav id="nav-menu-container">
            <ul className="nav-menu">
              <li className="menu-active">
                <a href="#hero">Home</a>
              </li>
              <li>
                <a href="#about">About Us</a>
              </li>
              <li>
                <a href="#contact">Contact Us</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
