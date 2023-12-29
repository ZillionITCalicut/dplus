import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import BASE_URL from '../../../../../../config';

const AddFaq = ({ onSuccess, handleViewCategories }) => {

    const [formData, setFormData] = useState({
        FaQqn: '',
        FaQans: ''

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

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


    const handleSubmit = async (e) => {
        e.preventDefault();
        /* console.log(formData); */
        try {
            const response = await axios.post(`${BASE_URL}/addFaQ/${userId}/${categoryId}/${projectId}`, formData);
            console.log(response.data);
            setSnackbarSeverity('success');
            setSnackbarMessage(response.data.message);
            setSnackbarOpen(true);
            handleViewCategories();
            if (onSuccess) {
                onSuccess(response.data.message);
            }

        } catch (error) {
            console.error('Error fetching data:', error);
            setSnackbarSeverity('error');
            setSnackbarMessage(error.response.data.message);
            setSnackbarOpen(true);
        }

    };


    return (
        <div>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Faq Question ?</Form.Label>
                    <Form.Control type="text" name='FaQqn' value={formData.FaQqn} onChange={handleChange} placeholder="Type Question Here..." />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Faq Answer</Form.Label>
                    <Form.Control as="textarea" name='FaQans' value={formData.FaQans} onChange={handleChange} rows={3} placeholder="Type Answer" />
                </Form.Group>
            </Form>

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
    )
}

export default AddFaq