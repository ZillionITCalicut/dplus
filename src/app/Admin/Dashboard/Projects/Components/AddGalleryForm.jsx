import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import BASE_URL from '../../../../../../config';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const AddGalleryForm = ({ onSuccess, handleViewCategories }) => {
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [formData5, setFormData5] = useState({});
    const [userId, setUserId] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [projectId, setProjectId] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedPhoto(file);
        setFormData5({
            ...formData5,
            image: file,
        });
    };

    const handleAltInputChange = (e) => {
        const altValue = e.target.value;
        setFormData5({
            ...formData5,
            alt: altValue,
        });
    };

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

    const handleUploadImages = async () => {
        try {
            const formData = new FormData();
            formData.append('image', formData5.image);
            formData.append('alt', formData5.alt);
            /* console.log(formData); */
            const response = await axios.post(`${BASE_URL}/ProjectId/${userId}/Category/${categoryId}/Projects/${projectId}`, formData);
            console.log(response.data);

            setSnackbarSeverity('success');
            setSnackbarMessage(response.data.message);
            setSnackbarOpen(true);
            handleViewCategories()
            if (onSuccess) {
                onSuccess(response.data.message);
            }
        } catch (error) {
            console.error('Error uploading image:', error);


        }
    };

    return (
        <div>
            <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Label>Select File</Form.Label>
                <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>

            <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Label>Alt Title</Form.Label>
                <Form.Control
                    type="text"
                    id="customFile"
                    name='alt'
                    value={formData5.alt}
                    onChange={handleAltInputChange} />

            </Form.Group>

            {selectedPhoto && (
                <div className="d-flex flex-wrap">
                    <div className="m-2">
                        <img
                            src={URL.createObjectURL(selectedPhoto)}
                            alt={`Preview`}
                            style={{ maxWidth: '100px', maxHeight: '100px' }}
                        />
                    </div>
                </div>
            )}

            <div className='btn btn-success mt-5 mb-5 d-flex justify-content-center' onClick={handleUploadImages}>
                <div>
                    Upload <i className="fa-solid fa-file"></i>
                </div>
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

export default AddGalleryForm;
