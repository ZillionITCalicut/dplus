"use client"
import React, { useEffect, useState } from 'react';
import ViewAllCategories from './Components/ViewAllCategories';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import BASE_URL from '../../../../../config';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import AddProjectForm from './Components/AddProjectForm';
import ProjectsList from './Components/ProjectsList';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ProjectDetailed from './Components/ProjectDetailed';
import RecentProjects from './Components/RecentProjects';

const Projects = () => {
  const [id1, setId] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const id = sessionStorage.getItem('userId');
    setId(id);

    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/project/view/${id}`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Initial fetch

    const intervalId = setInterval(() => {
      fetchData(); // Fetch data every second
    }, 1000); // Change this to 1000 milliseconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState({});
  const [projectDetail, setProjectDetail] = useState({});
  const [currentView, setCurrentView] = useState('categories');

  useEffect(() => {
    const id = sessionStorage.getItem('userId');
    setId(id);
  }, []);

  const [formData5, setFormData5] = useState({
    projectCategoryName: '',
    projectCategoryDescription: '',
    projectCategoryStatus: 'Active'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData5((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleAddBanner = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData5,
      project_Id: id1,
    };

    try {
      const response = await axios.post(`${BASE_URL}/AddProjectCategory/${id1}`, updatedFormData);
      setSnackbarMessage(response.data.message);
      setSnackbarOpen(true);

      handleClose();
    } catch (error) {
      console.error('Error adding Project Category:', error.response.data.message);
      setSnackbarMessage(error.response.data.message);
      setSnackbarOpen(true);
    }
  };

  const handleViewCategoryProjects = (category) => {
    setSelectedCategoryId(category);
    setCurrentView('projects');
  };

  const handleViewCategories = () => {
    setCurrentView('categories');
  };

  const handleProjectClick = (projectData) => {
    // Do something with the project data in the parent component
    setProjectDetail(projectData);
    setCurrentView('projectDetail');
  };

  const handleShowRecentProjects = (projectData) => {
    if (currentView !== 'RecentProjects') {
      setProjectDetail(projectData);
      setCurrentView('RecentProjects');
    } else {
      setProjectDetail({});
      setCurrentView('categories');
    }
  };

  const renderMainContent = () => {
    if (currentView === 'projects') {
      return <ProjectsList handleViewCategories={handleViewCategories} categoryId={selectedCategoryId} onProjectClick={handleProjectClick} />;
    } else if (currentView === 'projectDetail') {
      return <ProjectDetailed projectDetail={projectDetail} handleViewCategories={handleViewCategories} />;
    } else if (currentView === 'RecentProjects') {
      return <RecentProjects projectDetail={projectDetail} handleViewCategories={handleViewCategories} />;
    } else {
      return <ViewAllCategories onViewCategoryProjects={handleViewCategoryProjects} handleViewCategories={handleViewCategories} />;
    }
  };

  return (
    <div style={{ width: '98%', marginRight: '1%', marginLeft: '1%' }}>
      <div>
        <div className="row mt-2 mb-4 text-end">
          <div className="col-md-12">
            <div className='btn text-primary me-1 w-100 p-2 fs-5' onClick={handleShowRecentProjects} style={{ border: '1px solid blue' }}>
              Manage Recent Projects
            </div>
          </div>
        </div>


        <Breadcrumb>
          <Breadcrumb.Item >Home</Breadcrumb.Item>
          <Breadcrumb.Item onClick={() => handleViewCategories()}>
            Categories
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Projects</Breadcrumb.Item>
        </Breadcrumb>
      </div>


      <div>
        <div className="row mt-2 mb-4 text-end">
          <div className="col-md-6">
            <div className='btn btn-outline-dark me-1 w-100' onClick={handleShow}>
              <i className="fa-solid fa-plus"></i> Category
            </div>
          </div>
          <div className="col-md-6">
            <div className='btn btn-outline-dark me-5 w-100' onClick={handleShow1}>
              <i className="fa-solid fa-plus"></i> Project
            </div>
          </div>
        </div>
        {renderMainContent()}



        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Category Name</Form.Label>
              <Form.Control type="text" name='projectCategoryName' value={formData5.projectCategoryName} placeholder="Category Name" onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" name='projectCategoryDescription' value={formData5.projectCategoryDescription} rows={3} onChange={handleChange} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAddBanner}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={show1} onHide={handleClose1}>
          <Modal.Header closeButton>
            <Modal.Title>Add Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddProjectForm handleClose1={handleClose1} handleViewCategories={handleViewCategories} />
          </Modal.Body>

        </Modal>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={() => setSnackbarOpen(false)}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={() => setSnackbarOpen(false)}
            severity={snackbarMessage.includes('successfully') ? 'success' : 'error'}
          >
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </div>

    </div>
  );
}

export default Projects;
