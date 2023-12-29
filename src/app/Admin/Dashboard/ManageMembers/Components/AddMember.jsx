"use client"
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import BASE_URL from '../../../../../../config';
import ProjectId1 from '../../../../../../config1';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const AddMember = () => {
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [formData, setFormData] = useState({
        fullName: '',
        jobRole: '',
        phone: '',
        email: '',
        status: 'Active',
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [formErrors, setFormErrors] = useState({
        fullName: '',
        jobRole: '',
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedPhoto(file);
        setFormData({
            ...formData,
            memberFile: file,
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        let valid = true;
        const newFormErrors = { ...formErrors };

        if (!formData.fullName.trim()) {
            newFormErrors.fullName = 'Full Name is required';
            valid = false;
        } else {
            newFormErrors.fullName = '';
        }

        if (!formData.jobRole.trim()) {
            newFormErrors.jobRole = 'Job Role is required';
            valid = false;
        } else {
            newFormErrors.jobRole = '';
        }

        if (!formData.phone.trim()) {
            newFormErrors.phone = 'Phone is required';
            valid = false;
        } else {
            newFormErrors.phone = '';
        }

        if (!formData.email.trim()) {
            newFormErrors.email = 'E-Mail is required';
            valid = false;
        } else {
            newFormErrors.jobRole = '';
        }

        setFormErrors(newFormErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }
     /* console.log(formData); */ 
        try {
            const formDataObj = new FormData();
            formDataObj.append('fullName', formData.fullName);
            formDataObj.append('jobRole', formData.jobRole);
            formDataObj.append('phone', formData.phone);
            formDataObj.append('email', formData.email);
            formDataObj.append('status', formData.status);

            if (formData.memberFile) {
                formDataObj.append('memberFile', formData.memberFile);
            }

            const response = await axios.post(`${BASE_URL}/Project/${ProjectId1}/AddMember`, formDataObj);
            console.log(response.data.message);
            setFormData({
                fullName: '',
                jobRole: '',
                phone: '',
                email: '',
                status: 'Active',
            });

            // Reset selectedPhoto to null
            setSelectedPhoto(null);
            setSnackbarSeverity('success');
            setSnackbarMessage(response.data.message);
            setSnackbarOpen(true);

        } catch (error) {
            console.error('Error adding member:', error.response.data.message);
            setSnackbarSeverity('error');
            setSnackbarMessage(error.response.data.message);
            setSnackbarOpen(true);
        }
    };

    return (
        <div>
            <h4 className='mt-4 mb-4'>Add Member</h4>
            <TextField
                label="Full Name"
                name='fullName'
                value={formData.fullName}
                className='w-100 mt-2 mb-3'
                onChange={handleInputChange}
                error={!!formErrors.fullName}
                helperText={formErrors.fullName}
                focused
            />
            <TextField
                label="Job Role"
                name='jobRole'
                value={formData.jobRole}
                className='w-100 mt-2 mb-3'
                onChange={handleInputChange}
                error={!!formErrors.jobRole}
                helperText={formErrors.jobRole}
                focused
            />
            <TextField
                label="Phone"
                name='phone'
                value={formData.phone}
                className='w-100 mt-2 mb-3'
                onChange={handleInputChange}
                error={!!formErrors.phone}
                helperText={formErrors.phone}
                focused
            />
            <TextField
                label="E-Mail"
                name='email'
                value={formData.email}
                className='w-100 mt-2 mb-3'
                onChange={handleInputChange}
                error={!!formErrors.email}
                helperText={formErrors.email}
                focused
            />
            <i className="fa-solid fa-circle-info"></i> Image Resolution: 300 * 300
            <input type="file" className='form-control mt-2 mb-3' onChange={handleFileChange} />
            {selectedPhoto && (
                <div className="d-flex flex-wrap">
                    <div className="m-2">
                        <img src={URL.createObjectURL(selectedPhoto)} alt={`Preview`} />
                    </div>
                </div>
            )}
            <button className="btn btn-primary mt-3" onClick={handleSubmit}>
                Submit
            </button>
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

export default AddMember;
