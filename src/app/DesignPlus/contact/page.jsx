"use client"
import React, { useState } from 'react'
import '../../styles/style.css'
import '../css/style.css'
import '../../components/Header/header.css'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios'
import BASE_URL from '../../../../config'

const contact = () => {
    const [sucessMesage, setSucessMesage] = useState('');
    const [errorMessage, setErrorMesage] = useState('');

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
    const handleOpen = (itemId) => {
        setSucessMesage(itemId);
        setOpen(true);

    };

    const handleClose = () => {
        setSucessMesage(null);
        setOpen(false);
    };


    const [formData, setFormData] = useState({
        userName: '',
        userEmail: '',
        userPhone: '',
        userMessage: '',
        status: 'Active'
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'userEmail') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                setErrorMesage('Please enter a valid email address');
            } else {
                setErrorMesage('');
            }
        }

        // Validation logic for phone
        if (name === 'userPhone') {
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(value)) {
                setErrorMesage('Please enter a valid 10-digit phone number');
            } else {
                setErrorMesage('');
            }
        }


        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleAddEnquiries = async (e) => {
        e.preventDefault();

        // Reset error messages
        setErrorMesage('');

        if (
            formData.userName.trim() === '' ||
            formData.userEmail.trim() === '' ||
            formData.userPhone.trim() === ''
        ) {
            setErrorMesage('Please provide all details.');
            setTimeout(() => {
                setErrorMesage('');
            }, 4000);
        } else if (!errorMessage) {
            // Create a new object with only the validated details
            const validatedFormData = {
                userName: formData.userName.trim(),
                userEmail: formData.userEmail.trim(),
                userPhone: formData.userPhone.trim(),
                userMessage: formData.userMessage.trim(),
                status: 'Active',
            };

            try {
                const response = await axios.post(`${BASE_URL}/AddEnquiry`, validatedFormData);
                console.log(response.data.message);

                setSnackbarSeverity('success');
                setSnackbarMessage(response.data.message);
                setSnackbarOpen(true);
                handleOpen(response.data.message);

                setTimeout(() => {
                    handleClose();
                }, 3000);
                setTimeout(() => {
                    setSnackbarOpen(false);
                }, 5000);
                setFormData({
                    userName: '',
                    userEmail: '',
                    userPhone: '',
                    userMessage: '',
                    status: 'Active',
                });
            } catch (error) {
                console.error('Error adding Project Category:', error);
                setSnackbarSeverity('error');
                setSnackbarMessage(error.response.data.message);
                setSnackbarOpen(true);

                setTimeout(() => {
                    setSnackbarOpen(false);
                }, 5000);
            }
        }
    };


    return (
        <div>
            <div style={{ height: '70px' }}>
            </div>
            <div className="g-position--relative g-bg-color--primary">
                <div className="g-container--md mt-4">
                    <div className="g-text-center--xs g-margin-t-50--xs g-margin-b-80--xs ">
                        <p className="text-uppercase g-font-size-14--xs g-font-weight--700 g-color--white-opacity g-letter-spacing--2 g-margin-b-25--xs text-center">Contact Us</p>
                        <h1 className="g-font-size-32--xs g-font-size-36--sm">Get in Touch</h1>
                    </div>
                    <div className="row g-row-col--5 g-margin-b-80--xs">
                        <div className="col-md-4 g-full-width--xs g-margin-b-50--xs g-margin-b-0--sm">
                            <div className="g-text-center--xs">
                                <i className="g-display-block--xs g-font-size-40--xs g-color--white-opacity g-margin-b-30--xs fa-regular fa-envelope"></i>
                                <h2 className="g-font-size-18--xs g-margin-b-5--xs">Email</h2>
                                <p className="contactaddress"> info@dplus.co</p>
                            </div>
                        </div>
                        <div className="col-md-4 g-full-width--xs g-margin-b-50--xs g-margin-b-0--sm">
                            <div className="g-text-center--xs">
                                <i className="g-display-block--xs g-font-size-40--xs g-color--white-opacity g-margin-b-30--xs fa-solid fa-map-location-dot"></i>
                                <h2 className="g-font-size-18--xs  g-margin-b-5--xs">Address</h2>
                                <p className="contactaddress">Designplus, 3rd Floor, Shah arcade
Providence College Jn,<br /> NH 66 Bypass Malaparamba</p>
                            </div>
                        </div>
                        <div className="col-md-4 g-full-width--xs">
                            <div className="g-text-center--xs">
                                <i className="g-display-block--xs g-font-size-40--xs  g-margin-b-30--xs fa-solid fa-headset"></i>
                                <h2 className="g-font-size-18--xs g-color--white g-margin-b-5--xs">Call at</h2>
                                <p className="contactaddress">+91-9447262428  </p>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4 center-block">
                            <a href="https://maps.app.goo.gl/JUkL4B6sbjNYDDjf9" target="_blank" >
                                <img src="/img/QRcode.png" alt="" style={{ height: "250px" }} />
                            </a>

                            <h3>Scan<br /> & find us</h3>
                        </div>
                        <div className="col-md-8">
                            <form className="center-block g-width-500--sm g-width-550--md">
                                <div className="g-margin-b-30--xs">
                                    <input type="text" className="form-control s-form-v3__input" name='userName' value={formData.userName} placeholder="* Name" onChange={handleChange} />
                                </div>
                                <div className="row g-row-col-5 g-margin-b-50--xs">
                                    <div className="col-sm-6 g-margin-b-30--xs g-margin-b-0--md">
                                        <input type="email" className="form-control s-form-v3__input" name='userEmail' value={formData.userEmail} placeholder="* Email" onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-6">
                                        <input type="text" className={`form-control s-form-v3__input ${formData.userPhone === '' || !/^[0-9]{10}$/.test(formData.userPhone) ? '' : ''}`} name='userPhone' value={formData.userPhone} placeholder="* Phone" onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="g-margin-b-80--xs">
                                    <textarea className="form-control s-form-v3__input" rows="5" name='userMessage' value={formData.userMessage} placeholder="* Your message" onChange={handleChange}> </textarea>
                                </div>
                                <span className="text-danger">
                                    {errorMessage}
                                </span>
                                <div className="g-text-center--xs">
                                    <button type="submit" onClick={handleAddEnquiries} className="text-uppercase s-btn s-btn--md s-btn--black-bg g-radius--50 g-padding-x-70--xs g-margin-b-20--xs" >Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-description" className='text-cneter' sx={{ mt: 2 }}>
                        <img src="/img/7efs.gif" alt={sucessMesage} />
                        <div className="text-dark">
                            {sucessMesage}
                        </div>
                    </Typography>

                </Box>
            </Modal>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={5000}
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

export default contact