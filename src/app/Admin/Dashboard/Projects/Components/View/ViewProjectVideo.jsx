
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BASE_URL from '../../../../../../../config';

const ViewProjectVideo = () => {

    const [data, setData] = useState([]);
    const [userId, setUserId] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [projectId, setProjectId] = useState('');


    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/projects/all`);
                const storedCategory_Id = sessionStorage.getItem('Category_Id');


                if (storedCategory_Id) {
                    setCategoryId(storedCategory_Id);

                    // Filter the data array based on storedCategory_Id
                    const selectedItem = response.data.find(item => item.category_Id === storedCategory_Id);

                    setData(selectedItem);
                }
            } catch (error) {
                console.error('Error fetching Project:', error.response.data.message);
            }
        };

        fetchProjects();

        const intervalId = setInterval(() => {
            fetchProjects();
        }, 100);

        return () => clearInterval(intervalId);

    }, [setUserId, setCategoryId, setProjectId]);

    return (
        <div>
            <h3>Youtube Videos</h3>
            <div className="row ">
                <div className="col-md-12">
                    {data.ProjectVideo && (
                        <div >

                            <div className="row">
                                <div className="col-md-12 mt-3">
                                    <div className="d-flex align-items-center">
                                        <div>
                                            <iframe
                                                title={`Video`}
                                                className='w-100'
                                                src={`https://www.youtube.com/embed/${extractYouTubeVideoId(data.ProjectVideo)}`}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};


const extractYouTubeVideoId = (url) => {
    // Example YouTube URL formats:
    // - https://www.youtube.com/watch?v=VIDEO_ID
    // - https://youtu.be/VIDEO_ID
    const match = url.match(/[?&]v=([^?&]+)/) || url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : '';
};


export default ViewProjectVideo;
