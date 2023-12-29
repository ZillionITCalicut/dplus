import React, { useEffect, useState } from 'react';
import BASE_URL from '../../../../../../../config';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const ViewGallery = ({ projectDetail, onSuccess, handleViewCategories }) => {
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
    console.log(projectDetail);
    const [open, setOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);

    const handleOpen = (itemId) => {
        setSelectedItemId(itemId);
        setOpen(true);
    };

    const handleClose = () => {
        setSelectedItemId(null);
        setOpen(false);
    };
   
    const [userId, setUserId] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [projectId, setProjectId] = useState('');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/projects/all`);
                /*  console.log(response.data);
  */
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
                    console.log(selectedItem);
                }
            } catch (error) {
                console.error('Error fetching Project:', error.response.data.message);
            }
        };
        fetchProjects();
    }, [setUserId, setCategoryId, setProjectId]);

    const handleDeletePhoto = async () => {
        try {
            if (selectedItemId) {
                const response = await axios.delete(
                    `${BASE_URL}/delete/ProjectId/${userId}/Category/${categoryId}/Projects/${projectId}/Item/${selectedItemId}`
                );
                console.log(response);
                if (onSuccess) {
                    onSuccess(response.data.message);
                }
                handleClose();
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            handleClose();
        }
    };

    return (
        <div>
            <div>
                <div className="row">
                    {projectDetail.Gallery && projectDetail.Gallery.map((image) => (
                        <div className="col-md-4" key={image._id}>
                            <img src={`${BASE_URL}/${image.image}`} alt={`Gallery Image ${image._id}`} className="img-fluid" />
                            <div
                                className="text-center  border border-3 btn d-flex justify-content-center align-items-center"
                                onClick={() => handleOpen(image._id)}
                            >
                                <div>
                                    <i className="fa-solid fa-trash-can fa-xl"></i>
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
                        Are you sure you want to delete this image?
                    </Typography>
                    <div className="d-flex justify-content-around mt-4">
                        <div className='btn btn-outline-primary' onClick={handleClose}>Cancel</div>
                        <div className='btn btn-outline-danger' onClick={handleDeletePhoto}>Yes, Delete</div>

                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default ViewGallery;
