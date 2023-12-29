// Dashboard.jsx
"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BASE_URL from '../../../../config';
import Spinner from 'react-bootstrap/Spinner';
import VIewAllEnquiries from './Enquiries/components/VIewAllEnquiries';

const Dashboard = () => {
  const [projectData, setProjectData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = sessionStorage.getItem('userId');
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/project/view/${id}`);
        setProjectData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <div className='d-flex align-items-center justify-content-center mt-5'><div>Loading...</div> <div><Spinner animation="grow" variant="primary" /></div>  </div>
      ) : (

        <div>
          <div className="container">
            <h2 className='mt-5'>{projectData.projectName}</h2>
            <div className="row">
              <div className="col-md-4">
                <img src="/Logo/logoImg.png" alt="" />
              </div>
              <div className="col-md-6 p-5 fs-5">
                <div>Owner: {projectData.projectOwnerName}</div>
                <div>Phone: {projectData.phone}</div>
                <div>Email: {projectData.email}</div>
                <div>City: {projectData.city}</div>
                <div>Pin Code: {projectData.zip}</div>
                <div>Address: {projectData.address}</div>
              </div>

            </div>
            <div className="row mt-5">
              <VIewAllEnquiries />
            </div>
          </div>


        </div>
      )
      }
    </div >
  );
}

export default Dashboard;
