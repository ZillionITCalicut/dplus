import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import BASE_URL from '../../../../../../config';
import { Alert } from '@mui/material';

const AddProjectVideo = ({ onSuccess, handleViewCategories }) => {
    const [formData, setFormData] = useState({
        ProjectVideo: '',
    });

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        /* console.log(formData); */
        try {
            // Move the API call inside the if block
            const response = await axios.post(`${BASE_URL}/AddProjectVideos/${userId}/${categoryId}/${projectId}`, formData);
            console.log(response.data);
            if (onSuccess) {
                onSuccess(response.data.message);
            }
            handleViewCategories();
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('Error Adding !!!')
        }
    };


    return (
        <div>

            <h5>Example YouTube URL formats:</h5>
            <ul className='border'>
                <li>https://www.youtube.com/watch?v=VIDEO_ID
                </li>
                <li>https://youtu.be/VIDEO_ID
                </li>
            </ul>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Video Url (Youtube)</Form.Label>
                <Form.Control
                    type="text"
                    name="ProjectVideo"
                    value={formData.ProjectVideo}
                    placeholder="Enter Video Url"
                    onChange={handleChange}
                />
            </Form.Group>
            <Alert severity="error" className='animate__animated animate__headShake animate__infinite 	infinite'>Please Make sure that the Input Url is Valid!</Alert>
            <div className='btn btn-success mt-5 mb-5 d-flex justify-content-center' onClick={handleSubmit}>
                <div>
                    Update Video <i className="fa-solid fa-video"></i>
                </div>
            </div>
        </div>
    );
};

export default AddProjectVideo;
