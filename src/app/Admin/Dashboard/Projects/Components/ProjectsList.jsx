import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import BASE_URL from '../../../../../../config';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Alert1 from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const ProjectsList = ({ categoryId, onProjectClick }) => {

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const storedUserId = sessionStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    const toggleEditing = () => {
        setIsEditing(!isEditing);
    };
    /* if (!categoryId || !categoryId.projects || categoryId.projects.length === 0) {
        return <p>No projects available for this category.</p>;
    } */

    // Function to format the date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
        return formattedDate;
    };

    const [formData5, setFormData5] = useState({
        alt: ''
    });

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        setSelectedPhoto(file);
        setFormData5({
            ...formData5,
            projectCategoryThumbnail: file,
        });
    };
    const handleAltInputChange = (e) => {
        const altValue = e.target.value;
        setFormData5({
            ...formData5,
            alt: altValue,
        });
    };



    const addThumbnailCategory = async () => {
        try {
            const formData = new FormData();
            formData.append('projectCategoryThumbnail', formData5.projectCategoryThumbnail);
            formData.append('alt', formData5.alt);
            const response = await axios.post(`${BASE_URL}/Projects/${userId}/ProjectCategory/${categoryId._id}/thumbnail`, formData);

            console.log(response.data);
            setSnackbarSeverity('success');
            setSnackbarMessage(response.data.message);
            setSnackbarOpen(true);
            window.location.reload();
        } catch (error) {
            console.error('Error adding Thumbnail:', error);
            console.log('Response:', error.response); setSnackbarSeverity('error');
            /* setSnackbarMessage(error.response.data.message);
            setSnackbarOpen(true); */
        }
    };
    const handleProjectClick = (project) => {
        // Store the project id in sessionStorage
        sessionStorage.setItem('Selected_Project_Id', project._id);
        // Call the original onProjectClick function
        onProjectClick(project);
    };

    return (
        <div>
            <div className='d-flex align-items-center'>
                <h1>Projects for {categoryId.projectCategoryName} </h1>
                <h5 className='ms-5' onClick={toggleEditing}><i className="fa-solid fa-pen-to-square"></i></h5>
            </div>
            <div className="border">
                <div className="row mb-3">
                    {isEditing ? (
                        <div className="col-md-11 d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
                            <h4>
                                You Can't Edit Category Details
                            </h4>
                            <div>
                                <img src="/img/animate-ball-color.gif" width={'140px'} alt={categoryId.projectCategoryName} />
                            </div>
                        </div>
                    ) : (

                        <>
                            <div className="col-md-8 p-3">
                                <h5>Projects : </h5>
                                {categoryId.projects.map((project) => (
                                    <div className="col-md-4" key={project._id} onClick={() => handleProjectClick(project)}>
                                        <Card style={{ maxHeight: '450px', minHeight: '450px' }}>
                                            <Card.Body>
                                                <Card.Text>{project.projectCategory}</Card.Text>
                                                <Card.Title> {project.projectName.slice(0, 50)}</Card.Title>
                                                <div><i className="fa-solid fa-user"></i> Project Owner Name : {project.clientName}</div>
                                                <div className='text-end mt-4'><i className="fa-solid fa-location-dot"></i> {project.location}</div>
                                                <div className='text-end mt-4'><i className="fa-regular fa-building"></i>{project.area}</div>
                                                <div>Project Status : {project.projectStatus}</div>
                                                <div className='border border-2 text-center mt-3 mb-3 p-2'>Project Published Date: {formatDate(project.projectPublishedDate)}</div>
                                                <div>
                                                    Project Description: {project.projectDescription && project.projectDescription.length > 100
                                                        ? `${project.projectDescription.slice(0, 50)}...`
                                                        : project.projectDescription}
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                            <div className="col-md-3">
                                <div className="d-flex align-items-center mt-3">
                                    <div className="col-md-12">
                                        <div className="mt-3 mb-2">
                                            Category Name: {categoryId.projectCategoryName} <br />
                                            Category Description: {categoryId.projectCategoryDescription}  <br />
                                            Status: {categoryId.projectCategoryStatus}
                                        </div>
                                        <Stack sx={{ width: '100%' }} spacing={2}>

                                            <Alert1 severity="info" style={{ backgroundColor: '#e0e0e0' }}><span className="fs-6">Minumum Resolution <br /> 560px * 620px</span></Alert1>
                                        </Stack>
                                        <Form.Group controlId="formFile" className="mb-3">
                                            <Form.Label>Thumbnail : </Form.Label>
                                            <Form.Control
                                                type="file"
                                                accept="image/*"
                                                id="customFile"
                                                onChange={handleFileInputChange}
                                            />

                                        </Form.Group>
                                        <Form.Group controlId="formFile" className="mb-3">
                                            <Form.Label>Image Alt : </Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="customFile"
                                                name='alt'
                                                value={formData5.alt}
                                                onChange={handleAltInputChange}
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-2 text-center text-success btn" onClick={addThumbnailCategory}>
                                        <i className="fa-solid fa-circle-arrow-right fa-2xl"></i>
                                    </div>
                                </div>
                                {categoryId.projectCategoryThumbnail && <img src={`${BASE_URL}/${categoryId.projectCategoryThumbnail}`} alt="{category.projectCategoryThumbnail}" />}
                            </div>
                        </>

                    )}
                </div>

            </div>
            <div className="row mt-4 mb-5">

            </div>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={() => setSnackbarOpen(false)}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={() => setSnackbarOpen(false)}
                    severity={snackbarSeverity}
                >
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>

        </div>
    );
};

export default ProjectsList;
