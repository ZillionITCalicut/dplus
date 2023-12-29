import React from 'react'
import Header from './Components/Header/Header'
import LandingBanner from './Components/LandingBanner/LandingBanner'
import LandingContact from './Components/LandingContact/LandingContact'
import Footer from './Components/Footer/Footer'
import LandingAbout from './Components/LandingAbout/LandingAbout'


const LandingPage = () => {
  return (
    <div>
     
        <LandingBanner />
        <Header />
        <LandingAbout />
        <LandingContact />
        <Footer />
    </div>
  )
}

export default LandingPage