import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import BASE_URL from '../../../../../../config';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const AddProjectForm = ({ handleClose1, handleViewCategories }) => {
    const [id1, setId] = useState('');
    const [data, setData] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');


    const [formData, setFormData] = useState({
        projectCategory: '',
        projectName: '',
        area: '',
        clientName: '',
        location: '',
        projectStatus: '',
        status: 'Active',
        projectPublishedDate: '',
        projectDescription: '',
        projectTitleUrl: ''
    });

    useEffect(() => {
        const id = sessionStorage.getItem('userId');

        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/project/view/${id}`);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        setId(id);
    }, []);



    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Check if the changed field is the projectCategory select
        if (name === 'projectCategory') {
            const selectedCategory = data.projectCategory.find(category => category.projectCategoryName === value);

            // If a category is found, set its _id in the formData.category_Id
            setFormData({
                ...formData,
                [name]: value,
                category_Id: selectedCategory ? selectedCategory._id : null,
                Project_Id: id1
            });
        } else if (name === 'projectName') {
            const sanitizedValue = value.replace(/[^a-zA-Z0-9\s]/g, '');
            setFormData({
                ...formData,
                [name]: sanitizedValue,
            });
        } else if (name === 'projectTitleUrl') {
            // Replace spaces and special characters with underscores
            const sanitizedValue = value.replace(/[^\w\s]/g, '_').replace(/\s+/g, '_');
            setFormData({
                ...formData,
                [name]: sanitizedValue,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data submitted successfully:', formData);

        try {
            const response = await axios.post(`${BASE_URL}/Projects/${id1}/projects`, formData);
            console.log(response.data.message);
            setSnackbarSeverity('success');
            setSnackbarMessage(response.data.message);
            setSnackbarOpen(true);
            setFormData({
                projectCategory: '',
                projectName: '',
                clientName: '',
                area: '',
                location: '',
                projectStatus: '',
                status: 'Active',
                projectPublishedDate: '',
                projectDescription: '',
                projectTitleUrl: ''
            });

            // Close the modal after 3 seconds
            setTimeout(() => {
                handleClose1();
                // Call handleViewCategories after 2 seconds
                setTimeout(() => {
                    handleViewCategories();
                }, 2000);
            }, 2000);
        } catch (error) {
            console.error('Error submitting form data:', error.response.data.message);
            // Handle the error, show a user-friendly message, etc.
            setSnackbarSeverity('error');
            setSnackbarMessage(error.response.data.message);
            setSnackbarOpen(true);
        }
    };




    return (
        <div>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Category</Form.Label>
                <Form.Select
                    name="projectCategory"
                    value={formData.projectCategory}
                    onChange={handleInputChange}
                    aria-label="Default select example">
                    <option>Open this select menu</option>
                    {data.projectCategory && data.projectCategory.map(category => (
                        <option key={category._id} value={category.projectCategoryName}>
                            {category.projectCategoryName}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Project Name</Form.Label>
                <Form.Control type="text" placeholder="Project Name"
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleInputChange}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Client Name</Form.Label>
                <Form.Control type="text" placeholder="Client Name"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleInputChange}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" placeholder="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Area (Add Unit)</Form.Label>
                <Form.Control type="text" placeholder="Area"
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3}
                    placeholder="Description"
                    name="projectDescription"
                    value={formData.projectDescription}
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Project Status</Form.Label>
                <Form.Control type="text" placeholder="Project Status"
                    name="projectStatus"
                    value={formData.projectStatus}
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Published Date</Form.Label>
                <Form.Control type="date"
                    name="projectPublishedDate"
                    value={formData.projectPublishedDate}
                    onChange={handleInputChange}
                />

            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Project Url Title</Form.Label> 
                <Form.Control type="text" placeholder="Enter Project Title Url"
                    name="projectTitleUrl"
                    value={formData.projectTitleUrl}
                    onChange={handleInputChange}
                    required
                />
            </Form.Group>

            <div className='text-end mb-3'>
                <Button variant="primary" type="submit" className='w-100' onClick={handleSubmit}>
                    Submit
                </Button>
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

export default AddProjectForm;
