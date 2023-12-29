"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BASE_URL from '../../../../../config';
import Link from 'next/link';
import '../../css/style.css';
import '../../../styles/style.css'
import '../../../components/Project/project.css';



const Project3 = ({ params }) => {
  const categoryId = params.id;
  console.log(categoryId);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/projects/all`);
        console.log(response.data);
        // Filter projects based on categoryId
        const filteredProjects = response.data.filter(
          (project) => project.projectCategory === categoryId
        );
        setData(filteredProjects);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
      }
    };
    fetchData();
  }, [categoryId]);
  console.log(data);

  const oddProjects = data.filter((_, index) => index % 2 !== 0);
  const evenProjects = data.filter((_, index) => index % 2 === 0);

  return (
    <div>
      <section className="gallery-area g-padding-y-105--xs" style={{ backgroundColor: '#fff' }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 text-right">
              <div >
                <h1>
                  Discover Luxury <span>Living</span>
                  <br />
                  Our Featured Property Gallery<br />
                  <span style={{ float: 'right', marginTop: '20px' }}> <img src="/img/next.png" alt="" /></span>
                </h1>
              </div>
              {/*  <div className="row">
                <div className="col-lg-12 d-flex flex-wrap"> */}
              {oddProjects.map((project) => (
                <div key={project._id} className="single-gallery flex-grow-1">
                  {project.Gallery.length > 0 && (
                    <>
                      <img className="img-fluid" src={`${BASE_URL}/${project.Gallery[0].image}`} alt={project.Gallery[0].galleryAltTitle} />
                      <div className="light-box mt-4 me-4 text-end text-light">
                        <a href={`${BASE_URL}/${project.Gallery[0].image}`} className="">
                          <i className="fa-solid fa-expand fs-1 text-light"></i>
                        </a>
                        <Link href={`/DesignPlus/detail/${project.projectTitleUrl}`}>
                          <h2
                            className="headproject"
                            onClick={() => {
                              // Store data in localStorage
                              localStorage.setItem('proIdDP', project._id);
                              localStorage.setItem('proNaDP', project.projectName);
                              localStorage.setItem('proCaDP', project.projectCategory);
                            }}
                          >
                            {project.projectName} <br /> {project.location}
                          </h2>
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              ))}
              {/*   </div>
              </div> */}
            </div>
            <div className="col-lg-6 col-md-6 text-left">
              <div className="row">
                <div className="col-lg-12 d-flex flex-wrap">
                  {evenProjects.map((project) => (
                    <div key={project._id} className="single-gallery flex-grow-1">
                      {project.Gallery.length > 0 && (
                        <>
                          <img className="img-fluid" src={`${BASE_URL}/${project.Gallery[0].image}`} alt={project.Gallery[0].galleryAltTitle} />
                          <div className="light-box mt-4 me-4 text-end text-light">
                            <a href={`${BASE_URL}/${project.Gallery[0].image}`} className="">
                              <i className="fa-solid fa-expand fs-1 text-light"></i>
                            </a>
                            <Link href={`/DesignPlus/detail/${project.projectTitleUrl}`}>
                              <h2
                                className="headproject"
                                onClick={() => {
                                  // Store data in localStorage
                                  localStorage.setItem('proIdDP', project._id);
                                  localStorage.setItem('proNaDP', project.projectName);
                                  localStorage.setItem('proCaDP', project.projectCategory);
                                }}
                              >
                                {project.projectName} <br /> {project.location}
                              </h2>
                            </Link>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Project3;
