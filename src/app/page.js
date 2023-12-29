
import React from 'react'
import Banner from './components/Banner/Banner'
import About from './components/About/About'
import Category from './components/Category/Category'
import Project from './components/Project/Project'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import BlogHome from './components/Blog/BlogHome'
import Banner1 from './components/Banner1'



const page = () => {
  return (
    <div >
      <Header />
      <Banner1 />
      {/*  <Banner /> */}
      <Category />
      <Project />
      <BlogHome />
      <div className="mt-5">
        <About />
        <Footer />
      </div>
    </div>
  )
}

export default page