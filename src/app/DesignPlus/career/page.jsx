"use client"
import React, { useEffect, useState } from 'react'
import '../css/style.css'
import axios from 'axios'
import BASE_URL from '../../../../config'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Modal1 from '@mui/material/Modal';
import { Card, Form, Modal } from 'react-bootstrap'
import ProjectId1 from '../../../../config1'
import Link from 'next/link'
import './career.css'
import '../../styles/style.css'
import ReCAPTCHA from "react-google-recaptcha";
import '../../components/Header/header.css'


const career = () => {
    const [data, setData] = useState([]);

 const [show1, setShow1] = useState(false);
    const [selectedCareer, setSelectedCareer] = useState(null); // New state to store the selected career

    const handleClose1 = () => {
        setShow1(false);
        setSelectedCareer(null); // Reset selected career when modal is closed
    };

    const handleShow1 = (career) => {
        setSelectedCareer(career); // Set the selected career
        setShow1(true);
    };


    useEffect(() => {
        const fetchData = async () => {

            try {

                const response = await axios.get(`${BASE_URL}/project/view/${ProjectId1}`);


                // Check if Career exists in the response data
                if ('Career' in response.data) {
                    // Add unique IDs to each row
                    const dataWithIds = response.data.Career.map((row, index) => ({
                        ...row,
                        id: index, // You might need to replace this with a unique identifier from your data
                    }));
                    setData(dataWithIds);
                } else {
                    console.error('Career data not found in the response');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();

    }, []);


    const [formData, setFormData] = useState({
        userName: '',
        userEmail: '',
        userPhone: '',
        status: 'Active',
        postApplied: '',
        gender: '',
        zipCode: '',
        resume: null, // Add this line
    });


    const [sucessMesage, setSucessMesage] = useState('');
    const [errorMessage, setErrorMesage] = useState('');

    const [hoveredIndex, setHoveredIndex] = useState(null);

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

    const [recaptchaValue, setRecaptchaValue] = useState(null);

    const handleRecaptchaChange = (value) => {
        setRecaptchaValue(value);
    };

    const [open, setOpen] = useState(false);
    const handleOpen = (message) => {
        setSucessMesage(message);
        setOpen(true);

    };

    const handleClose = () => {
        setSucessMesage(null);
        setOpen(false);
    };



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
    
        // Check if the file is a PDF or DOC/DOCX
        const allowedFileTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
        if (file && allowedFileTypes.includes(file.type)) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                resume: file,
            }));
        } else {
            // Display an error message if the file type is not allowed
            setErrorMesage('Please upload a valid PDF or DOC/DOCX file.');
            setTimeout(() => {
                setErrorMesage('');
            }, 3000);
        }
    };
    



    const handleAddCareer = async (e) => {
        e.preventDefault();
        /* console.log(formData); */

        // Validate form fields
        if (
            formData.postApplied.trim() === '' ||
            formData.gender.trim() === '' ||
            formData.zipCode.trim() === '' ||
            formData.userName.trim() === '' ||
            formData.userEmail.trim() === '' ||
            formData.userPhone.trim() === ''
        ) {
            setErrorMesage('Please provide all details.');
            setTimeout(() => {
                setErrorMesage('');
            }, 3000);
        } else {
            /* console.log(formData); */
            try {
                if (!recaptchaValue) {
                    setErrorMesage('Please complete the reCAPTCHA verification.');
                    return;
                }

                const formDataObj = new FormData();
                formDataObj.append('postApplied', formData.postApplied);
                formDataObj.append('gender', formData.gender);
                formDataObj.append('zipCode', formData.zipCode);
                formDataObj.append('userName', formData.userName);
                formDataObj.append('userEmail', formData.userEmail);

                formDataObj.append('userPhone', formData.userPhone);

                if (formData.resume) {
                    formDataObj.append('resume', formData.resume);
                }
                const response = await axios.post(`${BASE_URL}/AddCareer`, formDataObj);
                console.log(response.data.message);

                // Display success message
                handleOpen(response.data.message);

                setTimeout(() => {
                    handleClose();
                }, 3000);

                // Clear form data on success
                setFormData({
                    userName: '',
                    userEmail: '',
                    userPhone: '',
                    status: 'Active',
                    postApplied: '',
                    gender: '',
                    zipCode: '',
                    resume: null,  // Reset the resume field
                });
            } catch (error) {
                console.error('Error adding:', error);

                // Display error message from the server
                setErrorMesage(error.response?.data?.message || 'An error occurred.');

                setTimeout(() => {
                    setErrorMesage('');
                }, 3000);
            }
        }
    };


    console.log(data);


    return (
        <div>
            <div style={{ height: '50px' }}>
            </div>
            <div className="g-padding-y-125--sm">
                <div className="g-container--sm">
                    <div className="g-text-center--xs ">
                        <h1 className="g-font-size-32--xs g-font-size-36--sm">Join Our Team</h1>
                        <p className="g-font-size-18--md">Whether through commerce or just an experience to tell your brand's story, the time has come to start using development languages that fit your projects needs.</p>
                    </div>
                </div>
            </div>

             <div className="container mb-5">
                <div className="row">
                    {data.map((career, index) => (
                        <div className="col-md-6" key={index}>
                            <Card
                                onClick={() => handleShow1(career)} // Pass the 'career' object to handleShow1
                                border="primary"
                                style={{
                                    marginBottom: '40px',
                                    minHeight: '300px',
                                    maxHeight: '300px',
                                    marginTop: '70px',
                                    border: hoveredIndex === index ? '1px solid #000' : 'white',
                                }}
                                className='shadow'
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <Card.Body className='d-flex flex-column justify-content-between'>
                                    <div>
                                        <Card.Title>
                                            <h2 style={{ fontFamily: 'Abel sans-serif', fontSize: '18px' }}>{career.JobName}</h2>
                                        </Card.Title>
                                        {career.JobLocation && <Card.Text style={{ fontFamily: 'Abel sans-serif' }}>
                                            <i className="fa-solid fa-location-dot"></i> {career.JobLocation}
                                        </Card.Text>}
                                        {career.ctcInfo && <Card.Text style={{ fontFamily: 'Abel sans-serif' }}>
                                            From {career.ctcInfo}
                                        </Card.Text>}
                                        <Card.Text className='careertext'>
<span dangerouslySetInnerHTML={{ __html: career.JobDescription.slice(0, 200)}}></span>
                                        </Card.Text>
                                    </div>
                                    <div className='text-end'>
                                        <Link href="#applyNow" className="text-uppercase s-btn s-btn--md s-btn--black-brd g-radius--50 "
                                            style={{ color: '#fff', textDecoration: 'none', border: '1px solid #fff' }}>APPLY NOW </Link>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>

            <div className="s-promo-block-v2 js__parallax-window " style={{ background: "url(/img/banner123.jpg) 50% 0 no-repeat fixed", backgroundSize: "cover" }} id='applyNow'>
                <div className="container">
                    <div className="row g-hor-centered-row--md">
                        <div className="col-md-12 g-hor-centered-row__col g-padding-y-40--xs">
                            <h2 style={{ color: '#fff' }}>Join Our Team</h2>
                            <p className="g-font-size-18--xs g-color--white-opacity1" style={{ fontFamily: 'Abel sans-serif' }}>We aim high at being focused on building relationships with our clients and community. Working together on the daily requires each individual to let the greater good of the team’s work surface above their own ego.</p>
                            {/*  <Link href="" className="text-uppercase s-btn s-btn--md btn btn-light g-radius--50 g-padding-x-50--xs ">About Us</Link> */}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <Form>
                                <div className="g-margin-b-40--xs">
                                    <Form.Select
                                        style={{ backgroundColor: '#fff', color: 'black' }}
                                        name="postApplied"
                                        value={formData.postApplied}
                                        onChange={handleChange}
                                        aria-label="Default select example"
                                    >
                                        <option>Post Applied For </option>
                                        {data.map((career) => (
                                            <option key={career.id} value={career.JobName}>
                                                {career.JobName}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </div>
                                <div className="g-margin-b-40--xs" style={{ color: '#fff' }}>
                                    <Form.Control type="text" style={{ backgroundColor: '#fff', color: 'black' }} name='userName' value={formData.userName} onChange={handleChange} placeholder="* Full Name" required />
                                </div>
                                <div className="g-margin-b-40--xs">
                                    <Form.Control type="email" style={{ backgroundColor: '#fff', color: 'black' }} name='userEmail' value={formData.userEmail} onChange={handleChange} placeholder="* Email" required />
                                </div>
                                <div className="g-margin-b-40--xs">
                                    <Form.Control type="text" style={{ backgroundColor: '#fff', color: 'black' }} name='userPhone' value={formData.userPhone} onChange={handleChange} placeholder="* Phone" required />
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="g-margin-b-40--xs">
                                            <Form.Select style={{ backgroundColor: '#fff', color: 'black' }} name='gender' value={formData.gender} onChange={handleChange} aria-label="Default select example">
                                                <option>Gender </option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Others">Others</option>
                                            </Form.Select>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="g-margin-b-40--xs">
                                            <Form.Control type="number" min={0} style={{ backgroundColor: '#fff', color: 'black' }} name='zipCode' value={formData.zipCode} onChange={handleChange} placeholder="* Pin Code" required />
                                        </div>
                                    </div>
                                </div>
                                <div className="g-margin-b-40--xs">
                                    <Form.Control
                                        type="file"
                                        style={{ backgroundColor: '#fff', color: 'black' }}
                                        name='resume'
                                        onInput={handleFileChange}
                                        accept=".doc, .docx, .pdf" 
                                        required
                                    />


                                </div>
                                <div className="g-margin-b-40--xs">
                                    <ReCAPTCHA
                                        sitekey="6LcXqD4pAAAAAOIpeMDupySRoRNprEeUtq7bInXb"
                                        onChange={handleRecaptchaChange}
                                    />
                                </div>

                                <p className="text-danger">
                                    {errorMessage}
                                </p>
                                <div className="g-text-center--xs">
                                    <button type="submit" onClick={handleAddCareer} className="text-uppercase btn-block s-btn s-btn--md s-btn--white-bg g-radius--50 g-padding-x-50--xs g-margin-b-20--xs">Join Now</button>
                                </div>
                            </Form>

                        </div>

                    </div>
                </div>
            </div>

             <Modal show={show1} size='lg' onHide={handleClose1} >
                <Modal.Header closeButton>
                    
                </Modal.Header>
                <Modal.Body>
                    {selectedCareer && (
                        <div>
<Modal.Title>{selectedCareer.JobName}</Modal.Title>
                            <p>Job Name: {selectedCareer.JobName}</p>
                            <p>Role: {selectedCareer.JobRole}</p>
                            <p>Location: {selectedCareer.JobLocation}</p>
                            <p>Ctc Info: {selectedCareer.ctcInfo}</p>

                            <p>Experience: {selectedCareer.JobExpirence}</p>
                            <p>Job Description:</p>
<span dangerouslySetInnerHTML={{ __html: selectedCareer.JobDescription}}></span>

                        </div>
                    )}
                </Modal.Body>
            </Modal>


            <Modal1
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
            </Modal1>

        </div >
    )
}

export default career