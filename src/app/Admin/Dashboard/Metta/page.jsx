"use client"

import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import BASE_URL from '../../../../../config';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Metta = () => {
    const [id1, setId] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
        const id = sessionStorage.getItem('userId');
        setId(id)
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/project/view/${id}`);
                setData(response.data.Metta);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        const intervalId = setInterval(() => {
            fetchData();
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    /*   console.log(data); */


    const [error, setError] = useState('');
    const [show, setShow] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const [formData, setFormData] = useState({
        page: '',
        title: '',
        keywords: '',
        description: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Update the corresponding field in formData
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleClose = () => {
        setShow(false);
        // Reset form data when modal is closed
        setFormData({
            page: '',
            title: '',
            keywords: '',
            description: '',
        });
    };

    const handleShow = (rowData) => {
        setSelectedRowData(rowData);
        // Populate form data with the selected row's data
        setFormData({
            page: rowData.page,
            title: rowData.title,
            metatitle: rowData.metatitle,
            keywords: rowData.keywords,
            description: rowData.description,
        });
        setShow(true);
    };

    const tableData = data;

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/AddMetta/Project/${id1}`, formData);
            console.log(response.data.message);
            setSnackbarSeverity('success');
            setSnackbarMessage(response.data.message);
            setSnackbarOpen(true);
            handleClose()
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error.response.data.message);
            setSnackbarSeverity('error');
            setSnackbarMessage(error.response.data.message);
            setSnackbarOpen(true);
            setTimeout(() => {
                setError('');
            }, 3000);
        }
    };

    const defaultRowData = {
        home: {
            page: 'Home',
            title: 'Home1',
            metatitle: 'Home1',
            keywords: 'Home2',
            description: 'Home3',
            // Add any other properties as needed
        },
        projectCategory: {
            page: 'ProjectCategory',
            title: 'ProjectCategory',
            metatitle: 'ProjectCategory',
            keywords: 'ProjectCategory',
            description: 'ProjectCategory',
            // Add any other properties as needed
        },
        portfolio: {
            page: 'Portfolio',
            title: 'Portfolio',
            metatitle: 'Portfolio',
            keywords: 'Portfolio',
            description: 'Portfolio',
            // Add any other properties as needed
        },
        blogPage: {
            page: 'BlogPage',
            title: 'BlogPage',
            metatitle: 'BlogPage',
            keywords: 'BlogPage',
            description: 'BlogPage',
            // Add any other properties as needed
        },
        media: {
            page: 'media',
            title: 'mediaPage',
            metatitle: 'mediaPage',
            keywords: 'mediaPage',
            description: 'mediaPage',
            // Add any other properties as needed
        },
        career: {
            page: 'career',
            title: 'careerPage',
            metatitle: 'careerPage',
            keywords: 'careerPage',
            description: 'careerPage',
            // Add any other properties as needed
        },
        contact: {
            page: 'contact',
            title: 'contactPage',
            metatitle: 'contactPage',
            keywords: 'contactPage',
            description: 'contactPage',
            // Add any other properties as needed
        },
        about: {
            page: 'about',
            title: 'aboutPage',
            metatitle: 'aboutPage',
            keywords: 'aboutPage',
            description: 'aboutPage',
            // Add any other properties as needed
        },
           };



    return (
        <div className='container mt-5'>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Page Title</th>
                        <th>Meta Title</th>
                        <th>description</th>
                        <th>keywords</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(defaultRowData).map((key, index) => {
                        const defaultRow = defaultRowData[key];
                        const rowData = tableData.find((row) => row.page === defaultRow.page);

                        return (
                            <tr key={index}>
                                <td>{rowData ? rowData.page : defaultRow.page}</td>
                                <td>{rowData ? rowData.title : defaultRow.title}</td>
                                <td>{rowData ? rowData.metatitle : defaultRow.metatitle}</td>
                                <td>{rowData ? rowData.keywords : defaultRow.keywords}</td>
                                <td>{rowData ? rowData.description : defaultRow.description}</td>
                                <td>
                                    <i className="fa-solid fa-pen-to-square" onClick={() => handleShow(rowData || defaultRow)}></i>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>


            </Table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Meta Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedRowData && (
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Page Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="page"
                                    value={formData.page}
                                    onChange={handleChange}
                                    readOnly
                                />
                            </Form.Group>
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
                                <Form.Label>Keywords</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="keywords"
                                    value={formData.keywords}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
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
                    severity={snackbarSeverity}
                >
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </div>
    );
};

export default Metta;
