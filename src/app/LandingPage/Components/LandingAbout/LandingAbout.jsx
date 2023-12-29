import React from 'react'

const LandingAbout = () => {
  return (
    <div>
      <section id="about">
        <div className="container wow fadeInUp">
          <div className="row">
            <div className="col-md-12">
              <h3 className="section-title">About Us </h3>
              <div className="section-title-divider"></div>
              <p className="section-description">An optimal platform for the genesis of inventive and innovative design.</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3 service-item">
              <div className="service-icon"><i className="fa fa-desktop"></i></div>
              <h4 className="service-title"><a href="">Architectural</a></h4>
              <p className="service-description">Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident</p>
            </div>
            <div className="col-md-3 service-item">
              <div className="service-icon"><i className="fa fa-bar-chart"></i></div>
              <h4 className="service-title"><a href="">Interior</a></h4>
              <p className="service-description">Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat tarad limino ata</p>
            </div>
            <div className="col-md-3 service-item">
              <div className="service-icon"><i className="fa fa-paper-plane"></i></div>
              <h4 className="service-title"><a href="">Landscape</a></h4>
              <p className="service-description">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</p>
            </div>
            <div className="col-md-3 service-item">
              <div className="service-icon"><i className="fa-solid fa-list-check"></i></div>
              <h4 className="service-title"><a href="">Project Management </a></h4>
              <p className="service-description">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default LandingAbout