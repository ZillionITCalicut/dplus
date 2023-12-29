import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import BASE_URL from '../../../../../../../config';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const ViewFaQ = ({ onSuccess, handleViewCategories }) => {
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
    const [data, setData] = useState([]);

    const handleOpen = (itemId) => {
        setSelectedItemId(itemId);
        setOpen(true);
    };

    const handleClose = () => {
        setSelectedItemId(null);
        setOpen(false);
    };

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [userId, setUserId] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [projectId, setProjectId] = useState('');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/projects/all`);
              
                const storedUserId = sessionStorage.getItem('userId');
                const storedCategory_Id = sessionStorage.getItem('Category_Id');
                const project = sessionStorage.getItem('Selected_Project_Id');

                if (project) {
                    setProjectId(project);
                }
                if (storedUserId) {
                    setUserId(storedUserId);
                }
                if (storedCategory_Id) {
                    setCategoryId(storedCategory_Id);

                    // Filter the data array based on storedCategory_Id
                    const selectedItem = response.data.find(item => item.category_Id === storedCategory_Id);

                    setData(selectedItem);
                }
            } catch (error) {
                console.error('Error fetching Project:', error.response.data.message);
            }
        };

        fetchProjects();

        const intervalId = setInterval(() => {
            fetchProjects();
        }, 100);

        return () => clearInterval(intervalId);

    }, [setUserId, setCategoryId, setProjectId]);


    const handleDeleteFaQ = async (faqId) => {
        try {
            const response = await axios.delete(`${BASE_URL}/deleteFaQ/${userId}/${categoryId}/${projectId}/${faqId}`);
          /*   console.log(response); */
            if (onSuccess) {
                onSuccess(response.data.message);
            }

            handleClose();
        } catch (error) {
            console.error('Error fetching data:', error);
            setSnackbarSeverity('error');
            setSnackbarMessage(error.response.data.message);
            setSnackbarOpen(true);
            handleViewCategories();
        }
    };

    return (
        <div>
            <Accordion defaultActiveKey="0">
                {data.FaQ && data.FaQ.map((faq, index) => (
                    <Accordion.Item key={index} eventKey={index.toString()}>
                        <Accordion.Header>{faq.FaQqn}</Accordion.Header>
                        <Accordion.Body>
                            {faq.FaQans}
                            <div className="text-end" >
                                <i
                                    style={{ cursor: 'pointer' }}
                                    className="fa-solid fa-trash-can fa-fade fa-lg "
                                    onClick={() => handleOpen(faq._id)}
                                ></i>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Are you sure you want to delete this Question?
                    </Typography>
                    <div className="d-flex justify-content-around mt-4">
                        <div className='btn btn-outline-primary' onClick={handleClose}>Cancel</div>
                        <div className='btn btn-outline-danger' onClick={() => handleDeleteFaQ(selectedItemId)}>Yes, Delete</div>
                    </div>
                </Box>
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
}

export default ViewFaQ;
