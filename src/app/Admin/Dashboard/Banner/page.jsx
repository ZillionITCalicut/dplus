"use client"

import React, { useEffect, useState } from 'react';
import ViewAllBanner from './Components/ViewAllBanner';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import BASE_URL from '../../../../../config';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ProjectId1 from '../../../../../config1';

const Banner = () => {
    const [id1, setId] = useState('');
    useEffect(() => {
        const id = sessionStorage.getItem('userId');
        setId(id);
    }, []);

    const [show, setShow] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const [formData5, setFormData5] = useState({
        id: ProjectId1,
        BannerName: '',
        bannerStatus: 'Active',
    });

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];

        setSelectedPhoto(file);

        setFormData5({
            ...formData5,
            banner: file,
        });

        const reader = new FileReader();
        reader.onload = (event) => {
            setImagePreview(event.target.result);
        };
        reader.readAsDataURL(file);
    };

    const handleChange = (e) => {
        const { name, type, checked } = e.target;
        const newValue =
            type === 'checkbox' ? (checked ? e.target.nextElementSibling.textContent : '') : e.target.value;

        setFormData5({
            ...formData5,
            [name]: newValue,
        });
    };

    const handleAddBanner = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('banner', formData5.banner);
            formData.append('id', ProjectId1);
            formData.append('BannerName', formData5.BannerName);
            formData.append('bannerStatus', formData5.bannerStatus);

            const response = await axios.post(`${BASE_URL}/add-banner`, formData);

            setSnackbarSeverity('success');
            setSnackbarMessage(response.data.message);
            setSnackbarOpen(true);

            setFormData5({
                id: id1,
                BannerName: '',
                bannerStatus: 'Active'
            });

            setSelectedPhoto(null);
            setImagePreview(null);
            handleClose();
            
        } catch (error) {
            console.error('Error adding Banner:', error);
            setSnackbarSeverity('error');
            setSnackbarMessage('Error adding Banner');
            setSnackbarOpen(true);
        }
    };

    return (
        <div>
            <div className="row mt-2 mb-4 text-end">
                <div className="col-md-12">
                    <div className="btn btn-primary me-5" onClick={handleShow}>
                        Add Banner
                    </div>
                </div>
            </div>

            <ViewAllBanner />

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Banner</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Banner Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Banner Name"
                            autoFocus
                            name="BannerName"
                            value={formData5.BannerName}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <label className="form-label" htmlFor="customFile">
                        Add-Banner Image
                    </label>
                    <input
                        className="form-control mb-5"
                        id="customFile"
                        type="file"
                        accept="image/*"
                        onChange={handleFileInputChange}
                    />
                    {imagePreview && <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%' }} />}
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

export default Banner;