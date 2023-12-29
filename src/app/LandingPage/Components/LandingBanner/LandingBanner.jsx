"use client"
import React, { useState, useEffect } from 'react';
import '../../style2.css'
import Link from 'next/link';


const LandingBanner = () => {
    const rotatingTexts = ['Architectural ', 'Interior ', ' Landscape ','Project Management '];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % rotatingTexts.length);
    }, 3000);

    // Cleanup function to clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures that this effect runs only once on mount

  return (
    <div>
  <section id="hero">
      <div className="hero-container">
        <div className="wow fadeIn">
          <div className="hero-logo"  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Link href="/"><img className="" src="/Logo/logodplus.png" alt="" style={{ height: '200px' }} /></Link>
          </div>

          <h1>
            We create <span className="rotating">{rotatingTexts[currentTextIndex]}</span>
          </h1>
        </div>
      </div>
    </section>
  </div>
  )
}

export default LandingBanner