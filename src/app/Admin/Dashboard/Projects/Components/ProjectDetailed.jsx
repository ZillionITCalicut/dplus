import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import AddGalleryForm from './AddGalleryForm';
import AddTestimonailVideos from './AddTestimonailVideos';
import AddLocationForm from './AddLocationForm';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AddFaq from './AddFaq';
import ViewFaQ from './View/ViewFaQ';
import ViewLocation from './View/ViewLocation';
import ViewGallery from './View/ViewGallery';
import ViewYoutubeVideos from './View/ViewYoutubeVideos';
import { Box, Typography } from '@mui/material';
import Modal1 from '@mui/material/Modal';
import axios from 'axios';
import BASE_URL from '../../../../../../config';
import ViewProjectVideo from './View/ViewProjectVideo';
import AddProjectVideo from './AddProjectVideo';
import ViewMetta from './View/ViewMetta';
import AddMetta from './AddMetta';

const ProjectDetailed = ({ projectDetail, handleViewCategories }) => {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        p: 4,
    };

    /* console.log(projectDetail); */
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const [userId, setUserId] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [projectId, setProjectId] = useState('');

    useEffect(() => {
        const storedUserId = sessionStorage.getItem('userId');
        const Category_Id = sessionStorage.getItem('Category_Id');
        const project = sessionStorage.getItem('Selected_Project_Id');
        if (project) {
            setProjectId(project);
        }
        if (storedUserId) {
            setUserId(storedUserId);
        }
        if (Category_Id) {
            setCategoryId(Category_Id);
        }
    }, []);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [open, setOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);

    const handleOpen5 = (itemId) => {
        setSelectedItemId(itemId);
        setOpen(true);
    };

    const handleClose5 = () => {
        setSelectedItemId(null);
        setOpen(false);
    };

    const [show1, setShow1] = useState(false);
    const handleClose1 = (successMessage) => {
        setShow1(false);
        console.log('Success Message:', successMessage);
        setSnackbarSeverity('success');
        setSnackbarMessage(successMessage);
        setSnackbarOpen(true);

    };
    const handleShow1 = () => setShow1(true);

    const [show2, setShow2] = useState(false);
    const handleClose2 = (successMessage) => {
        setShow2(false);
        console.log('Success Message:', successMessage);
        setSnackbarSeverity('success');
        setSnackbarMessage(successMessage);
        setSnackbarOpen(true);

    };
    const handleShow2 = () => setShow2(true);


    const [show3, setShow3] = useState(false);
    const handleClose3 = (successMessage) => {
        setShow3(false);
        console.log('Success Message:', successMessage);
        setSnackbarSeverity('success');
        setSnackbarMessage(successMessage);
        setSnackbarOpen(true);

    };
    const handleShow3 = () => setShow3(true);

    const [show4, setShow4] = useState(false);
    const handleClose4 = (successMessage) => {
        setShow4(false);
        console.log('Success Message:', successMessage);
        setSnackbarSeverity('success');
        setSnackbarMessage(successMessage);
        setSnackbarOpen(true);

    };
    const handleShow4 = () => setShow4(true);


    const [show6, setShow6] = useState(false);
    const handleClose6 = (successMessage) => {
        setShow6(false);
        console.log('Success Message:', successMessage);
        setSnackbarSeverity('success');
        setSnackbarMessage(successMessage);
        setSnackbarOpen(true);

    };
    const handleShow6 = () => setShow6(true);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
        return formattedDate;
    };

    const handleDeleteProject = async (projectId1) => {
        try {
            const response = await axios.delete(`${BASE_URL}/deleteProjects/${userId}/categories/${categoryId}/projects/${projectId1}`);
            console.log(response);

            handleViewCategories();
            handleClose();
        } catch (error) {
            console.error('Error fetching data:', error);
            setSnackbarSeverity('error');

            handleViewCategories();
        }
    };

    return (
        <div>
            <div>
                <div className='d-flex justify-content-between'>
                    <div>
                        <h1>
                            {projectDetail.projectName}

                        </h1>
                    </div>
                    <div className='me-5'>
                        <h5 onClick={() => handleOpen5(projectDetail._id)}>
                            <i className="fa-solid fa-trash" ></i>
                        </h5>
                    </div>
                </div>
            </div>
            <div>


                <div className="row mt-2 mb-4">
                    <div className="col-md-2" >
                        <div className="btn w-100" style={{ border: '1px solid black' }} onClick={handleShow}>
                            Add Gallery Images
                        </div>
                    </div>
                    <div className="col-md-2" >
                        <div className="btn w-100" style={{ border: '1px solid black' }} onClick={handleShow4}>
                            Add Project Video
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="btn w-100" style={{ border: '1px solid black' }} onClick={handleShow1}>
                            Testimonial Videos
                        </div>
                    </div>

                    <div className="col-md-2">
                        <div className="btn w-100" style={{ border: '1px solid black' }} onClick={handleShow3}>
                            Add FaQ
                        </div>
                    </div>


                    <div className="col-md-2">
                        <div className="btn w-100" style={{ border: '1px solid black' }} onClick={handleShow2}>
                            Add Location
                        </div>

                    </div>
                    <div className="col-md-2">
                        <div className="btn w-100" style={{ border: '1px solid black' }} onClick={handleShow6}>
                            Add metta
                        </div>

                    </div>

                </div>


                <div className="row" >
                    <div className="col-md-9"  >
                        <div className="mt-3 mb-3 p-2" style={{ border: '1px solid black' }}>
                            <Tabs
                                defaultActiveKey="Gallery"
                                id="fill-tab-example"
                                className="mb-3 "
                                fill
                            >
                                <Tab eventKey="Gallery" title="Gallery">
                                    <ViewGallery projectDetail={projectDetail} handleViewCategories={handleViewCategories} />
                                </Tab>
                                <Tab eventKey="Project Video" title="Project Video">
                                    <ViewProjectVideo projectDetail={projectDetail} />
                                </Tab>
                                <Tab eventKey="Testimonial Videos" title="Testimonial Videos">
                                    <ViewYoutubeVideos projectDetail={projectDetail} handleViewCategories={handleViewCategories} />
                                </Tab>
                                <Tab eventKey="FaQ" title="FaQ">
                                    <ViewFaQ projectDetail={projectDetail} onSuccess={handleClose2} handleViewCategories={handleViewCategories} />
                                </Tab>
                                <Tab eventKey="Location" title="Location">
                                    <ViewLocation projectDetail={projectDetail} />
                                </Tab>
                                <Tab eventKey="Meta" title="Meta">
                                    <ViewMetta projectDetail={projectDetail} />
                                </Tab>
                            </Tabs>

                        </div>
                    </div>

                    <div className="col-md-3 border border-3 " style={{ maxHeight: '700px' }}>
                        <h5 className='mt-3 mb-4'><u>Project Details</u></h5>
                        <p>Project Name : {projectDetail.projectName} </p>
                        <p>Category : {projectDetail.projectCategory}</p>
                        <p>Client Name : {projectDetail.clientName}</p>
                        <p>Published Date : {formatDate(projectDetail.projectPublishedDate)}</p>
                        <p>Project Status : {projectDetail.projectStatus}</p>

                        <p>Description : {projectDetail.projectDescription}</p>
                    </div>
                </div>

                {/* Gallery Modal */}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Gallery Images</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AddGalleryForm handleViewCategories={handleClose} />
                    </Modal.Body>
                </Modal>

                {/* Testimonial Modal */}
                <Modal show={show1} onHide={handleClose1}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Testimonial Videos</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AddTestimonailVideos onSuccess={handleClose1} handleViewCategories={handleClose1} />
                    </Modal.Body>
                </Modal>

                {/* Add Location */}
                <Modal show={show2} onHide={handleClose2}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Location Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AddLocationForm onSuccess={handleClose2} handleViewCategories={handleClose2} />
                    </Modal.Body>
                </Modal>

                {/* Add Location */}
                <Modal show={show3} onHide={handleClose3}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add FaQ</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AddFaq onSuccess={handleClose3} handleViewCategories={handleClose3} />
                    </Modal.Body>
                </Modal>

                {/* Add Location */}
                <Modal show={show4} onHide={handleClose4}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Project Video</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AddProjectVideo onSuccess={handleClose4} handleViewCategories={handleClose4} />
                    </Modal.Body>
                </Modal>

                <Modal show={show6} onHide={handleClose6}>
                    <Modal.Header closeButton>
                        <Modal.Title>Meta Details - Project</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AddMetta projectDetail={projectDetail} onSuccess={handleClose6} handleViewCategories={handleViewCategories} />
                    </Modal.Body>
                </Modal>

                <Modal1
                    open={open}
                    onClose={handleClose5}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <i className="fa-solid fa-triangle-exclamation fa-lg text-danger"></i>   Are you sure you want to delete this Project? <br />
                            You Will Loose All Data About this Project.
                        </Typography>
                        <div className="d-flex justify-content-around mt-4">
                            <div className='btn btn-outline-primary' onClick={handleClose}>Cancel</div>
                            <div className='btn btn-outline-danger' onClick={() => handleDeleteProject(selectedItemId)}>Yes, Delete</div>
                        </div>
                    </Box>
                </Modal1>

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
        </div>

    )
}

export default ProjectDetailed