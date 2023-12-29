import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import BASE_URL from '../../../../../../config';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { DataGrid, GridToolbar, GridPagination } from '@mui/x-data-grid';
import Modal1 from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import RichTextEditor from 'react-rte';
import ProjectId1 from '../../../../../../config1';

const PostJob = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setFormData({
            JobName: '',
            JobDescription: '',
            JobExpirence: '',
            status: 'Active',
            JobRole: '',
            JobLocation: '',
            ctcInfo: ''
        });
        setShow(true);
    };

    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const [id1, setId] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [JobDescription, setJobDescription] = useState(RichTextEditor.createEmptyValue());

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
        setFormData({
            JobName: '',
            JobDescription: '',
            JobExpirence: '',
            status: 'Active',
            JobRole: '',
            JobLocation: '',
            ctcInfo: ''
        });
    };

    useEffect(() => {
        const id = sessionStorage.getItem('userId');
        setId(id)
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/project/view/${id}`);

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

        const intervalId = setInterval(() => {
            fetchData();
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);


    const [formData, setFormData] = useState({
        JobName: '',
        JobDescription: '',
        JobExpirence: '',
        status: 'Active',
        JobRole: '',
        JobLocation: '',
        ctcInfo: ''

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const handleSubmit = async () => {
        /* console.log(formData); */
        try {
            const response = await axios.post(`${BASE_URL}/AddCareerItem/${id1}`, formData);
           /*  console.log(response.data.message); */
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
    /*  console.log(data); */
    const columns = [
        { field: 'JobName', headerName: 'Job Title', width: 180 },
        /*  { field: 'JobDescription', headerName: 'Description', width: 180 }, */
        { field: 'JobRole', headerName: 'Job Role', width: 180 },
        { field: 'JobLocation', headerName: 'Location', width: 180 },
        { field: 'ctcInfo', headerName: 'Salary Info', width: 180 },

        { field: 'JobExpirence', headerName: 'Expirence', width: 180 },
        { field: 'status', headerName: 'Status', width: 180 },
        {
            field: 'Actions',
            headerName: 'Actions',
            width: 180,
            renderCell: (params) => (
                <div>
                    <i
                        className="fa-solid fa-pen fa-lg ms-3"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleShow2(params.row)}
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
   
    
    const handleDeleteCareerItem = async (CareerItemId) => {
        try {
            const response = await axios.delete(`${BASE_URL}/AdminCareer/${id1}/delete/${CareerItemId}`);
    
            console.log(response.data.message);
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
    
    

    const handleJobDescriptionChange = (value) => {
        setJobDescription(value);
        setFormData({
            ...formData,
            JobDescription: value.toString('html'),
        });
    };

    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = (rowData) => {
        setSelectedItemId(rowData._id); // Assuming _id is the property in your data
        setFormData({
            _id: rowData._id, // Pass _id to the form data
            JobName: rowData.JobName,
            JobRole: rowData.JobRole,
            ctcInfo: rowData.ctcInfo,
            JobLocation: rowData.JobLocation,
            JobExpirence: rowData.JobExpirence,
            JobDescription: RichTextEditor.createValueFromString(rowData.JobDescription, 'html'),
        });
        setShow2(true);
    };



    const handleUpdate = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/projects/${ProjectId1}/editcareer/${formData._id}`, {
                ...formData,
                JobDescription: formData.JobDescription.toString('html'),
            });
            console.log(response.data.message);
            setSnackbarSeverity('success');
            setSnackbarMessage(response.data.message);
            setSnackbarOpen(true);
            handleClose2();
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error.response.data.message);
            setSnackbarSeverity('error');
            setSnackbarMessage(error.response.data.message);
            setSnackbarOpen(true);
            setTimeout(() => {
                setError('');
            }, 3000);
            handleClose2();
        }
    };


    const handleJobDescriptionChange1 = (value) => {
        setFormData({
            ...formData,
            JobDescription: value,
        });
    };



    return (
        <div>
            <div className="row mt-2 mb-4">
                <div className="col-md-3" >
                    <div className="btn w-100" style={{ border: '1px solid black' }} onClick={handleShow}>
                        Add Job Description
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div style={{ height: 600, width: '100%', backgroundColor: 'whitesmoke' }}>
                        <DataGrid
                            rows={data}
                            columns={columns}
                            components={{
                                Toolbar: GridToolbar,
                                Pagination: GridPagination,
                            }}
                            pagination
                            pageSize={5}
                        />
                    </div>
                </div>
            </div>

            <Modal show={show} size='lg' onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add JD Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Job Title</Form.Label>
                            <Form.Control type="text" placeholder="Job title" name='JobName' value={formData.JobName} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Job Role</Form.Label>
                            <Form.Control type="text" placeholder="Role" name='JobRole' value={formData.JobRole} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Salary Info</Form.Label>
                            <Form.Control type="text" placeholder="Salary Info" name='ctcInfo' value={formData.ctcInfo} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Location</Form.Label>
                            <Form.Control as="textarea" rows={2} name='JobLocation' value={formData.JobLocation} onChange={handleChange} placeholder='Enter Job Details' />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Experience (Year)</Form.Label>
                            <Form.Select aria-label="Default select example" name='JobExpirence' value={formData.JobExpirence} onChange={handleChange}>
                                <option>Open this select menu</option>
                                <option value="Fresher">Fresher</option>
                                <option value="1+">1+</option>
                                <option value="2+">2+</option>
                                <option value="3+">3+</option>
                                <option value="4+">4+</option>
                                <option value="5+">5+</option>
                                <option value="10+">10+</option>

                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Job Description</Form.Label>
                            <RichTextEditor
                                value={JobDescription}
                                onChange={handleJobDescriptionChange}
                            />
                            {/*   <Form.Control as="textarea" rows={3} name='JobDescription' value={formData.JobDescription} onChange={handleChange} placeholder='Enter Job Details' /> */}
                        </Form.Group>
                    </Form>
                    <p className='text-danger'>{error}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={handleSubmit}>Save changes</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={show2} size='lg' onHide={handleClose2}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Job Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Job Title</Form.Label>
                            <Form.Control type="text" placeholder="Job title" name='JobName' value={formData.JobName} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Job Role</Form.Label>
                            <Form.Control type="text" placeholder="Role" name='JobRole' value={formData.JobRole} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Salary Info</Form.Label>
                            <Form.Control type="text" placeholder="Salary Info" name='ctcInfo' value={formData.ctcInfo} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Location</Form.Label>
                            <Form.Control as="textarea" rows={2} name='JobLocation' value={formData.JobLocation} onChange={handleChange} placeholder='Enter Job Details' />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Experience (Year)</Form.Label>
                            <Form.Select aria-label="Default select example" name='JobExpirence' value={formData.JobExpirence} onChange={handleChange}>
                                <option>Open this select menu</option>
                                <option value="Fresher">Fresher</option>
                                <option value="1+">1+</option>
                                <option value="2+">2+</option>
                                <option value="3+">3+</option>
                                <option value="4+">4+</option>
                                <option value="5+">5+</option>
                                <option value="10+">10+</option>

                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Job Description</Form.Label>
                            <RichTextEditor
                                value={formData.JobDescription}
                                onChange={handleJobDescriptionChange1}
                            />
                        </Form.Group>
                    </Form>
                    <p className='text-danger'>{error}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose2}>Close</Button>
                    <Button variant="primary" onClick={handleUpdate}>Save changes</Button>
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
                        <div className='btn btn-outline-danger' onClick={() => handleDeleteCareerItem(selectedItemId)}>Yes, Delete</div>
                    </div>
                </Box>
            </Modal1>

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

export default PostJob