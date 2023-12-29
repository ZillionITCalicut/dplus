"use client"

import React from 'react'
import ViewAllCareerRequest from './Components/ViewAllCareerRequest'
import PostJob from './Components/PostJob'
import { Tab, Tabs } from 'react-bootstrap'

const Career = () => {
  
  return (
    <div>
      <h4 className='p-2'> <i className="fa-solid fa-list-check me-2"></i> Careers</h4>


      <div className="row" >
        <div className="col-md-11"  >
          <div className="mt-3 mb-3 p-2" style={{ border: '1px solid black' }}>
            <Tabs
              defaultActiveKey="Careers"
              id="fill-tab-example"
              className="mb-3 "
              fill
            >
              <Tab eventKey="Enquiries" title="Enquiries">
                <ViewAllCareerRequest />
              </Tab>
              <Tab eventKey="Careers" title="Careers">
                <PostJob />
              </Tab>
            </Tabs>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Career