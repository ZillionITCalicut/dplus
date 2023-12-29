"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BASE_URL from '../../../../../../config';
import '../../../css/style.css'
import '../../../../styles/style.css'
import './details.css'
import Faq from './components/Faq/Faq';
import Location from './components/Location/Location';
import ProjectGallery from './components/ProjectGallery/ProjectGallery'
import '../../../../components/Header/header.css'





const Pro_Detail = ({ params }) => {
    const categoryId = params.id;
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [gallery, setGallery] = useState([]);

    useEffect(() => {
        const projectNameFromLocalStorage = localStorage.getItem('proNaDP');

        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/projects/all`);

                // Filter projects based on categoryId
                const filteredProjects = response.data.filter(
                    (project) => project.projectCategory === categoryId
                );

                // Filter the projects again based on projectName from localStorage
                const selectedProject = filteredProjects.filter(
                    (project) => project.projectName === projectNameFromLocalStorage
                );

                setData(selectedProject);
                setGallery(selectedProject[0]?.Gallery || []);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data. Please try again later.');
            }
        };

        fetchData();
    }, [categoryId]);
    const faqData = data[0]?.FaQ || []; // Access FaQ property from selectedProject (assuming it's an array)

    const filteredProjectsLeft = faqData.filter((project, index) => index % 2 !== 0);
    const filteredProjectsRight = faqData.filter((project, index) => index % 2 === 0);

    console.log(data);
    return (
        <div>
            {data.map((project) => (
                <div key={project.id}>
                    <div className='mb-5 mt-5'>
                        <ProjectGallery gallery={gallery} />
                    </div>

                    <div className="container">
                        <div className="row">
                            <div className="col-md-10">
                                <div className="g-margin-b-40--xs">
                                    <p className="text-uppercase g-font-size-14--xs g-font-weight--700 g-color--primary g-letter-spacing--2 g-margin-b-25--xs">
                                        {project.projectCategory}
                                    </p>
                                    <h2 className="g-font-size-32--xs g-font-size-36--sm g-margin-b-30--xs">
                                        {project.projectName}
                                    </h2>
                                    <p>Client: {project.clientName}</p>
                                    <p>Building Area: {project.area}</p>
                                    <p>Project Status: {project.projectStatus}</p>
                                    <p>
                                        Project Description: {project.projectDescription}
                                    </p>
                                    <p>
                                        Notable Features: Frameless Glazing Sky Garden “See-Through” Fire Place Clerestory Window Slot Window Rooftop patio
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-2 d-flex align-items-center">
                                {project.gmapUrl && (
                                    <>
                                        <div className="row">
                                            <div className="col-md-12 d-flex align-items-end">
                                                <Location data={data} />
                                            </div>
                                        </div>

                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="row mt-5 mb-5">
                        {project.video && project.video.length > 0 && (
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
                                                        className='w-100'
                                                        height={'580px'}
                                                        src={`https://www.youtube.com/embed/${extractYouTubeVideoId(project.ProjectVideo)}`}
                                                        title={project.video[0].title} // Assuming title is the property in each video item
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


                    {project.video && project.video.length > 0 && (
                        <>
                            <div className="video-content mt-5">
                                    <div className="container">
                                    <h3 className='text-center mt-5 mb-5 className="g-font-size-32--xs g-font-size-36--sm g-margin-b-30--xs' style={{ color: 'black' }}>Client Testimonial </h3>
                                        <div className="row">
                                            <div className="col-lg-10 offset-lg-1">
                                                <div className="video-frame">
                                                <iframe
                                                        className='w-100'
                                                        height={'580px'}
                                                        src={`https://www.youtube.com/embed/${extractYouTubeVideoId(project.video[0].videoUrl)}`}
                                                        title={project.video[0].title} // Assuming title is the property in each video item
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
                            />
                        </div>
                    )}





                </div>
            ))}

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




export default Pro_Detail;
