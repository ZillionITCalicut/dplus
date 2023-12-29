"use client"


import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar, GridPagination } from '@mui/x-data-grid';
import axios from 'axios';
import BASE_URL from '../../../../../../config';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal1 from '@mui/material/Modal';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import BlogDetail from './BlogDetail';


const ViewAllBlog = () => {
    const [id1, setId] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [properties, setProperties] = useState([]);
    const [selectedRowId, setSelectedRowId] = useState('');
    const [show, setShow] = useState(false);
    const [showBlogDetailModal, setShowBlogDetailModal] = useState(false);
    const [selectedBlogId, setSelectedBlogId] = useState('');
    const [selectedBlogDetails, setBlogDetails] = useState(null); // Add this line



    const [formData5, setFormData5] = useState({

    });

    const handleClose = () => {
        setShow(false);
        setSelectedImage(null);
    };
    const handleShow = () => setShow(true);

    const [selectedImage, setSelectedImage] = useState(null);

    const [fileInput, setFileInput] = useState(null);

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

    const [open, setOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);

    const handleOpen1 = (itemId) => {
        setSelectedItemId(itemId);
        setOpen(true);
    };

    const handleClose1 = () => {
        setSelectedItemId(null);
        setOpen(false);
    };

    useEffect(() => {
        const id = sessionStorage.getItem('userId');
        setId(id);

        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/project/view/${id}`);
                setProperties(response.data.blog);
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

    const columns = [
        { field: 'BlogDate', headerName: 'Blog Date', width: 180 },
        {
            field: 'BlogImage',
            headerName: 'Blog Image',
            width: 180,
            renderCell: (params) => (
                <img
                    src={`${BASE_URL}/${params.row.BlogImage} `}
                    alt="Blog Image"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            ),
        },
        { field: 'BlogHeading', headerName: 'Blog Heading', width: 180 },
        { field: 'Category', headerName: 'Category', width: 180 },
        { field: 'BlogAuthor', headerName: 'Blog Author', width: 180 },
        {
            field: 'Actions',
            headerName: 'Actions',
            width: 180,
            renderCell: (params) => (
                <div>
                    <i
                        className="fa-solid fa-eye fa-lg "
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleOpenBlogDetail(params.row._id)}
                    ></i>
                    <i
                        className="fa-solid fa-image fa-lg ms-3"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleImageClick(params.row._id)}
                    ></i>
                    <i
                        className="fa-solid fa-trash fa-lg ms-3"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleOpen1(params.row._id)}
                    ></i>



                </div>
            ),
        },
    ];

    const handleImageClick = (id) => {
       /*  console.log(`Image clicked for blog post with ID: ${id}`); */
        setSelectedRowId(id);
        handleShow();
    };

    const getRowId = (row) => row._id;

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFileInput(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
        setFormData5({
            ...formData5,
            BlogImage: file,
        });
    };

    const addBlogImage = async () => {
        try {
            const formData = new FormData();
            formData.append('BlogImage', formData5.BlogImage);
          /* console.log(formData); */ 
            const response = await axios.post(`${BASE_URL}/Blog/${id1}/${selectedRowId}/BlogImage`, formData);

            console.log(response.data);
            setSnackbarSeverity('success');
            setSnackbarMessage(response.data.message);
            setSnackbarOpen(true);
            handleClose()

        } catch (error) {
            console.error('Error fetching data:', error.response.data.message);
            setSnackbarSeverity('error');
            setSnackbarMessage(error.response.data.message);
            setSnackbarOpen(true);
        }
    };

    const handleDeleteBlog = async (BlogId) => {
        try {
            const response = await axios.delete(`${BASE_URL}/deleteBlog/${id1}/blogs/${BlogId}`);

            console.log(response.data);
            setSnackbarSeverity('success');
            setSnackbarMessage(response.data.message);
            setSnackbarOpen(true);
            handleClose1();

        } catch (error) {
            console.error('Error fetching data:', error.response.data.message);
            setSnackbarSeverity('error');
            setSnackbarMessage(error.response.data.message);
            setSnackbarOpen(true);
        }
    };

    const handleOpenBlogDetail = (blogId) => {
        // Find the selected blog by ID
        const selectedBlog = properties.find((blog) => blog._id === blogId);

        // Check if the blog is found
        if (selectedBlog) {
            setSelectedBlogId(blogId);
            setBlogDetails(selectedBlog); // Set the blog details to a state variable
            setShowBlogDetailModal(true);
        }
    };

    const handleCloseBlogDetail = () => {
        setSelectedBlogId('');
        setShowBlogDetailModal(false);
    };

    const handleBlogDetailSuccess = (message) => {
        console.log(`Success: ${message}`);
        setSnackbarSeverity('success');
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };


    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    <div style={{ height: 600, width: '100%', backgroundColor: 'whitesmoke' }}>
                        <DataGrid
                            rows={properties}
                            columns={columns}
                            components={{
                                Toolbar: GridToolbar,
                                Pagination: GridPagination,
                            }}
                            pagination
                            pageSize={5}
                            /*  checkboxSelection */
                            getRowId={getRowId}
                        />
                    </div>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Blog Image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Choose a file</Form.Label>
                        <Form.Control type="file" onChange={handleFileChange} />
                    </Form.Group>
                    {selectedImage && (
                        <img
                            src={selectedImage}
                            alt="Selected Blog Image"
                            style={{ maxWidth: '100%', marginBottom: '10px' }}
                        />
                    )}

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={addBlogImage}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal1
                open={open}
                onClose={handleClose1}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Are you sure you want to delete this Question?
                    </Typography>
                    <div className="d-flex justify-content-around mt-4">
                        <div className='btn btn-outline-primary' onClick={handleClose1}>Cancel</div>
                        <div className='btn btn-outline-danger' onClick={() => handleDeleteBlog(selectedItemId)}>Yes, Delete</div>
                    </div>
                </Box>
            </Modal1>

            <Modal show={showBlogDetailModal} size='lg' onHide={handleCloseBlogDetail}>
                <Modal.Header closeButton>
                    <Modal.Title>Blog Details / Edit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Pass selectedBlogId to BlogDetail component */}
                    <BlogDetail onSuccess={handleBlogDetailSuccess} blogDetails={selectedBlogDetails} selectedBlogId={selectedBlogId} handleCloseBlogDetail={handleCloseBlogDetail} />
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
                    severity={snackbarSeverity}
                >
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>

        </div>
    );
};

export default ViewAllBlog;
