"use client"
import axios from 'axios';
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import BASE_URL from '../../../../../../config';
import ProjectId1 from '../../../../../../config1';

const AddMetta = ({ onSuccess, projectDetail, handleViewCategories }) => {
    console.log(projectDetail);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        title: projectDetail.projectName || '',
        metatitle: projectDetail.metatitle || '',
        keywords: projectDetail.keywords || '',
        description: projectDetail.description || '',
        projectTitleUrl: projectDetail.projectTitleUrl || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'projectTitleUrl') {
            // Replace spaces with a single hyphen and ensure no consecutive hyphens
            const sanitizedValue = value.replace(/\s+/g, '-').replace(/-+/g, '-');
            setFormData({
                ...formData,
                [name]: sanitizedValue,
            });
        } else {
            // For other fields, update the state as usual
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async () => {
        /* console.log(formData); */
        try {
            const response = await axios.post(`${BASE_URL}/AddMetta/Individual/Project/${ProjectId1}/${projectDetail.category_Id}/${projectDetail._id}`, formData);
            console.log(response.data.message);
            if (onSuccess) {
                onSuccess(response.data.message);
            }
            handleViewCategories();
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Error Adding !!!')
            setTimeout(() => {
                setError('');
            }, 3000);
        }
    };

    return (
        <div>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Page Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Page Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Meta Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Page Title"
                        name="metatitle"
                        value={formData.metatitle}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Meta Keywords</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="keywords"
                        value={formData.keywords}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Meta Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Page_Url</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="projectTitleUrl"
                        value={formData.projectTitleUrl}
                        onChange={handleChange}
                    />
                </Form.Group>

            </Form>
            <p className="text-danger">{error}</p>
            <Button variant="primary" onClick={handleSubmit}>
                Save Changes
            </Button>
        </div>
    )
}

export default AddMetta