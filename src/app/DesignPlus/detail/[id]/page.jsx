"use client"
import React, { useEffect, useState } from 'react';
import BASE_URL from '../../../../../config';
import axios from 'axios';
import ProjectGallery from './components/ProjectGallery/ProjectGallery';
import Location from './components/Location/Location';
import Faq from './components/Faq/Faq';

const Page = ({ params }) => {
  const id = params.id;
  const [projectData, setProjectData] = useState([]);
  const [data, setData] = useState({});
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/projects/all`);
        setProjectData(response.data);
        const filteredProject = response.data.find(project => project.projectTitleUrl === id);
        console.log(filteredProject);
        setData(filteredProject || {}); // Set as an object if no project is found
        setGallery((filteredProject && filteredProject.Gallery) || []);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id]);

  const faqData = data.FaQ || []; // Access FaQ property from selectedProject (assuming it's an array)

  const filteredProjectsLeft = faqData.filter((project, index) => index % 2 !== 0);
  const filteredProjectsRight = faqData.filter((project, index) => index % 2 === 0);

  console.log(projectData);

  return (
    <div>
      <div key={data.id}>
        <div className='mb-5 mt-5'>
          <ProjectGallery gallery={gallery} />
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-10">
              <div className="g-margin-b-40--xs">
                <p className="text-uppercase g-font-size-14--xs g-font-weight--700 g-color--primary g-letter-spacing--2 g-margin-b-25--xs">
                  {data.projectCategory}
                </p>
                <h1 className="g-font-size-32--xs g-font-size-36--sm">
                  {data.projectName}
                </h1>
                <p>Client: {data.clientName}</p>
                <p>Building Area: {data.area}</p>
                <p>Project Status: {data.projectStatus}</p>
                <p>
                  Project Description: {data.projectDescription}
                </p>
                              </div>
            </div>
            <div className="col-md-2 d-flex align-items-center">
              {data.gmapUrl && (
                <>
                  <div className="row">
                    <div className="col-md-12 d-flex align-items-end">
                       <Location data={data.gmapUrl} />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="row mt-5 mb-5">
          {data.video && data.video.length > 0 && (
            <>
              <div className="video section">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-4 offset-lg-4">
                      <div className="section-heading text-center">
                        <h6 style={{ color: '#fff' }}>| Video View |</h6>
                        <h2>Get Closer View & Different Feeling</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="video-content">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-10 offset-lg-1">
                      <div className="video-frame">
                        <iframe
                          className='w-100 projectDetailsVideo'
                          src={`https://www.youtube.com/embed/${extractYouTubeVideoId(data.ProjectVideo)}`}
                          title={data.video[0].title} // Assuming title is the property in each video item
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {data.video && data.video.length > 0 && (
          <>
            <div className="video-content mt-5">
              <div className="container">
                <h3 className='text-center mt-5 mb-5 className="g-font-size-32--xs g-font-size-36--sm g-margin-b-30--xs' style={{ color: 'black' }}>Client Testimonial </h3>
                <div className="row">
                  <div className="col-lg-10 offset-lg-1">
                    <div className="video-frame">
                      <iframe
                        className='w-100 projectDetailsVideo'
                        src={`https://www.youtube.com/embed/${extractYouTubeVideoId(data.video[0].videoUrl)}`}
                        title={data.video[0].title} // Assuming title is the property in each video item
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {faqData && faqData.length > 0 && (
          <div className="mt-4 mb-5">
             <Faq
                                filteredProjectsLeft={filteredProjectsLeft}
                                filteredProjectsRight={filteredProjectsRight}
                            />          </div>
        )}
      </div>
    </div>
  );
};

const extractYouTubeVideoId = (url) => {
  if (!url) {
    return ''; // Handle the case when url is undefined or null
  }

  // Example YouTube URL formats:
  // - https://www.youtube.com/watch?v=VIDEO_ID
  // - https://youtu.be/VIDEO_ID
  const match = url.match(/[?&]v=([^?&]+)/) || url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
  return match ? match[1] : '';
};

export default Page;
