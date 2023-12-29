"use client"

import React, { useEffect, useState } from 'react';
import './category.css';
import axios from 'axios';
import BASE_URL from '../../../../config';
import Link from 'next/link';
import ProjectId1 from '../../../../config1';
import { scroller } from 'react-scroll';
import '../../DesignPlus/css/style.css'
import '../../styles/style.css'

const Category = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/project/view/${ProjectId1}`);
        setData(response.data.projectCategory);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight;
        if (isVisible) {
          element.classList.add('animate__animated', 'animate__fadeInUp');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    scroller.scrollTo('categorySection', {
      duration: 1500,
      delay: 150,
      smooth: true,
    });
  }, []);

  return (
    <div>
      <section className="category123 background_one mt-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div>
                <h1 className='main_title' style={{ paddingBottom: '40px' }}>
                  We are Design plus Architects <br />
                  Kozhikode, Kerala.<br /></h1>
                         <h4 style={{ marginTop: '-40px',fontSize:'20px' }} className='mb-4'>
                  <span className="word-with-shadow">Architectural</span>
                  <span className="separator"></span>
                  <span className="word-with-shadow">Interior</span>
                  <span className="separator"></span>
                  <span className="word-with-shadow">Landscape</span>
                  <span className="separator"></span>
                  <span className="word-with-shadow">Project Management</span>
                </h4>              </div>

              {data && data.length > 0 && (
                data.map((category, index) => (
                  index % 2 !== 0 && category.projects && category.projects.length > 0 && (
                    <div className="single-project animate-on-scroll" key={category._id}>
                      <img className="img-fluid categoryHome " src={`${BASE_URL}/${category.projectCategoryThumbnail}`} alt={category.projectCategoryAlt} />
                      <div className="project-details">
                        <h4>{category.projectCategoryName}</h4>
                        <Link href={`/DesignPlus/Categories/${category.projectCategoryName}`} className="main_btn1">
                          View Details
                          <img src="/img/next.png" alt="" />
                        </Link>
                      </div>
                    </div>
                  )
                ))
              )}
            </div>

            <div className="col-lg-6 col-md-6">
              {data && data.length > 0 && (
                data.map((category, index) => (
                  index % 2 === 0 && category.projects && category.projects.length > 0 && (
                    <div className="single-project animate-on-scroll" key={category._id}>
                      <img className="img-fluid categoryHome" src={`${BASE_URL}/${category.projectCategoryThumbnail}`} alt={category.name} />
                      <div className="project-details">
                        <h4>{category.projectCategoryName}</h4>
                        <Link href={`/DesignPlus/Categories/${category.projectCategoryName}`} className="main_btn1">
                          View Details
                          <img src="/img/next.png" className="project" alt="" />
                        </Link>
                      </div>
                    </div>
                  )
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Category;
