import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import BASE_URL from '../../../../../../config';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const AddLocationForm = ({ onSuccess, handleViewCategories }) => {
    const [formData, setFormData] = useState({
        gmapUrl: '',
    });

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateGMapUrl = (url) => {
        // A simple regex pattern to match Google Maps URLs
        const googleMapsRegex = /^https:\/\//;

        // Check if the URL matches the Google Maps regex
        return googleMapsRegex.test(url);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate gmapUrl
        if (!validateGMapUrl(formData.gmapUrl)) {
            setSnackbarSeverity('error');
            setSnackbarMessage('Invalid Google Maps URL. Please provide a valid Google Maps sharing link.');
            setSnackbarOpen(true);
            return;
        }

        try {
            // Move the API call inside the if block
            const response = await axios.post(`${BASE_URL}/addGMapUrl/${userId}/${categoryId}/${projectId}`, formData);
            console.log(response.data);
            setSnackbarSeverity('success');
            setSnackbarMessage(response.data.message);
            setSnackbarOpen(true);

            if (onSuccess) {
                onSuccess(response.data.message);
            }
            handleViewCategories();
        } catch (error) {
            console.error('Error fetching data:', error);
            setSnackbarSeverity('error');
            setSnackbarMessage(error.response?.data?.message || 'Failed to add GMap URL.');
            setSnackbarOpen(true);
        }
    };


    return (
        <div>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Share gmap <i className="fa-solid fa-location-crosshairs"></i> Location Url</Form.Label>
                <Form.Control type="text" name='gmapUrl' value={formData.gmapUrl} placeholder="Url" onChange={handleChange} />
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

export default AddLocationForm;
