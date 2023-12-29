"use client"

import React, { useEffect, useState } from 'react'
import '../../../css/style.css'
import axios from 'axios'
import BASE_URL from '../../../../../../config'
import ProjectId1 from '../../../../../../config1'
import './team.css'
import '../../../../components/Header/header.css'
import '../../../css/style.css'
import '../../../../styles/style.css'



const Team = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchData = async () => {
      try {
        const url = `${BASE_URL}/project/view/${ProjectId1}`;
        console.log('Request URL:', url);
        const response = await axios.get(url);
        console.log(response.data);
        setData(response.data.Member);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setError('Error fetching data. Please try again later.');
      }
    };

    fetchData();
  }, [ProjectId1]);

  console.log(data);

  return (
    <div>
      <div className="container">
        <div className="g-text-center--xs ">
          <h2 className="g-font-size-32--xs g-font-size-36--sm">A word of inspiration</h2>
        </div>
        <div className="row g-overflow--hidden">
          <div className="col-xs-12 g-full-width--xs text-center">
            <div className="g-width-400--lg mx-auto"> {/* Added mx-auto for horizontal centering */}
              <img className="img-responsive g-width-100-percent--xs" src="/img/02.jpg" alt="Image" />
              <div className="g-position--overlay g-padding-x-30--xs g-padding-y-30--xs g-margin-t-o-60--xs">
                <div className="g-bg-color--primary g-padding-x-15--xs g-padding-y-10--xs g-margin-b-20--xs">
                  <h4 className="g-font-size-22--xs g-font-size-26--sm g-color--white g-margin-b-0--xs">Anna Kusaikina</h4>
                </div>
                <p className="g-font-weight--700">Founder</p>
                <p>Now that we've aligned the details, it's time to get things mapped out and organized. This part is really crucial in keeping the project in line to completion.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row g-row-col--0">
        <div className="container">
          <div className="g-text-center--xs g-margin-b-100--xs">

            <h2 className="g-font-size-32--xs g-font-size-36--sm ">Our Stalwarts</h2>
          </div>
        </div>
      </div>
      <div className="container mb-5 ">
        <div className="row">
          {data.map((member) => (
            <div key={member._id} className="col-md-3 mb-4">
              <div className="wow fadeInUp" data-wow-duration=".3" data-wow-delay=".2s">
                <div className="col-md-4 cardNew">
                  <div className="image-card">
                    <img src={`${BASE_URL}/${member.memberFile} `} alt={member.fullName} />
                    <h2>{member.fullName}</h2>

                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="container">
        <div className="row">

        </div>
      </div>
    </div>
  )
}

export default Team