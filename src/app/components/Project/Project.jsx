"use client"

import React, { useEffect, useState } from 'react';
import './project.css';
import '../../styles/style.css';
import BASE_URL from '../../../../config';
import axios from 'axios';
import ProjectId1 from '../../../../config1';
import Link from 'next/link';
import { scroller } from 'react-scroll';

const Project = () => {
  const [userId, setUserId] = useState('');
  const [data, setData] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    const storedUserId = sessionStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }

    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/projects/all`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching Project:', error);
      }
    };
    fetchProjects();

  }, []);

  useEffect(() => {
    const fetchData = async (projectId) => {
      try {
        const url = `${BASE_URL}/project/view/${projectId}`;
        const response = await axios.get(url);
        const recentProjectIds = response.data.recentProject[0].Project_Ids1;

        // Do not filter here, filter only once outside
        const projectMap = new Map(data.map((project) => [project._id, project]));

        // Order projects based on recentProjectIds
        const orderedProjects = recentProjectIds.map((projectId) => projectMap.get(projectId));

        setFilteredProjects(orderedProjects);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData(ProjectId1);

  }, [ProjectId1, data]);

  // Filter outside the useEffect
  const filteredProjectsLeft = filteredProjects.filter((project, index) => index % 2 !== 0);
  const filteredProjectsRight = filteredProjects.filter((project, index) => index % 2 === 0);


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
    <>
      {filteredProjects.length > 0 && (
        <div>
          <section className="gallery-area g-padding-y-101--xs" style={{ backgroundColor: '#fff' }}>
            <div className="container-fluid">
              <div className="row">
                {/* Display odd-indexed projects on the left */}
                <div className="col-lg-6 col-md-6">
                  <div className="">
                    <h1 className='main_title'>
                      Our Accomplishments
                      <br />
                      will thrill you<br />
                      {/*    <span style={{ float: 'right', marginTop: '20px' }}> <img src="/img/next.png" alt="" /></span> */}
                    </h1>
                  </div>
                  {filteredProjectsLeft.map((project, index) => (
                    <div key={index} className="single-gallery animate-on-scroll">
                      {project && project.Gallery && project.Gallery[0] && (
                        <>
                          <img className='img-fluid' src={`${BASE_URL}/${project.Gallery[0].image}`} alt={project.Gallery[0].galleryAltTitle} />
                          <div className="light-box mt-4 me-4 text-end  text-light">
                            <a href={`${BASE_URL}/${project.Gallery[0].image}`} className="">
                              <i className="fa-solid fa-expand fs-1 text-light"></i>
                            </a> <br />
                            <Link href={`/DesignPlus/detail/${project.projectTitleUrl}`} className='text-light'
                              onClick={() => {
                                // Store data in localStorage
                                localStorage.setItem('proIdDP', project._id);
                                localStorage.setItem('proNaDP', project.projectName);
                                localStorage.setItem('proCaDP', project.projectCategory);
                              }}
                            >
                              <span className="fs-4" style={{ fontFamily: 'Abel sans-serif' }}> {project.projectName}</span>
                              <br /> <span className="fs-5" style={{ fontFamily: 'Abel sans-serif' }}> {project.area}</span>
                            </Link>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>

                <div className="col-lg-6 col-md-6">
                  {filteredProjectsRight.map((project, index) => (
                    <div key={index} className="single-gallery animate-on-scroll">
                      {project && project.Gallery && project.Gallery[0] && (
                        <>
                          <img className='img-fluid' src={`${BASE_URL}/${project.Gallery[0].image}`} alt={project.Gallery[0].galleryAltTitle} />
                          <div className="light-box mt-4 me-4 text-end text-light">
                            <Link href={`${BASE_URL}/${project.Gallery[0].image}`} >
                              <i className="fa-solid fa-expand fs-1 text-light "></i>
                            </Link> <br />
                            <Link href={`/DesignPlus/detail/${project.projectTitleUrl}`} className='text-light'
                              onClick={() => {
                                localStorage.setItem('proIdDP', project._id);
                                localStorage.setItem('proNaDP', project.projectName);
                                localStorage.setItem('proCaDP', project.projectCategory);
                              }}
                            >
                              <span className="fs-4" style={{ fontFamily: 'Abel sans-serif' }}> {project.projectName}</span>
                              <br /> <span className="fs-5" style={{ fontFamily: 'Abel sans-serif' }}> {project.area}</span>
                            </Link>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default Project;
