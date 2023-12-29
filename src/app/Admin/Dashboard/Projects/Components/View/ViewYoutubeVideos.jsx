import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import BASE_URL from '../../../../../../../config';
import Box from '@mui/material/Box';

const ViewYoutubeVideos = ({ handleViewCategories }) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [open, setOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [data, setData] = useState([]);
    const [userId, setUserId] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [projectId, setProjectId] = useState('');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/projects/all`);
                
                const storedUserId = sessionStorage.getItem('userId');
                const storedCategory_Id = sessionStorage.getItem('Category_Id');
                const project = sessionStorage.getItem('Selected_Project_Id');

                if (project) {
                    setProjectId(project);
                }
                if (storedUserId) {
                    setUserId(storedUserId);
                }
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


    const handleOpen = (itemId) => {
        setSelectedItemId(itemId);
        setOpen(true);
    };

    const handleClose = () => {
        setSelectedItemId(null);
        setOpen(false);
    };


    const handleDeleteVideo = async (videoId) => {
        try {
            const response = await axios.delete(`${BASE_URL}/deleteVideo/${userId}/${categoryId}/${projectId}/${videoId}`);
            console.log(response);
            if (onSuccess) {
                onSuccess(response.data.message);
            }

            handleClose();
        } catch (error) {
            console.error('Error fetching data:', error);

            handleViewCategories();
        }
    };


    return (
        <div>
            <h3>Youtube Videos</h3>
            <div className="row ">
                <div className="col-md-6">
                    {data.video &&
                        data.video.map((video) => (
                            <div key={video._id} >

                                <div className="row">
                                    <div className="col-md-6 mt-3">
                                        <div className="d-flex align-items-center">
                                            <div>
                                                <iframe
                                                    title={`Video ${video._id}`}
                                                    className=''
                                                    src={`https://www.youtube.com/embed/${extractYouTubeVideoId(video.videoUrl)}`}
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                ></iframe>
                                            </div>
                                            <div className='ms-4' >
                                                <i className="fa-solid fa-trash fa-2xl" onClick={() => handleOpen(video._id)} ></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>

            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Are you sure you want to delete this Question?
                    </Typography>
                    <div className="d-flex justify-content-around mt-4">
                        <div className='btn btn-outline-primary' onClick={handleClose}>Cancel</div>
                        <div className='btn btn-outline-danger' onClick={() => handleDeleteVideo(selectedItemId)}>Yes, Delete</div>
                    </div>
                </Box>
            </Modal>

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

export default ViewYoutubeVideos;
