"use client"

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BASE_URL from '../../../../../../config';
import { DataGrid, GridToolbar, GridPagination } from '@mui/x-data-grid';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
const ViewAllCareerRequest = () => {

    const [properties, setProperties] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
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

    const handleOpen = (itemId) => {
        setSelectedItemId(itemId);

        setOpen(true);
    };

    const handleClose = () => {
        setSelectedItemId(null);
        setOpen(false);
    };


    useEffect(() => {
        const handleFetchCareers = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/ViewAll/Careers`);
                const propertiesWithIds = response.data.map((property) => ({
                    ...property,
                    id: property._id, // Use _id as the unique identifier
                }));
                setProperties(propertiesWithIds);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        handleFetchCareers();

        const intervalId = setInterval(() => {
            handleFetchCareers();
        }, 100);

        return () => clearInterval(intervalId);
    }, []);



    const columns = [
        { field: 'userName', headerName: 'Name', width: 180 },
        { field: 'userPhone', headerName: 'Phone', width: 180 },
        { field: 'postApplied', headerName: 'Applied For', width: 180 },
        { field: 'gender', headerName: 'Gender', width: 180 },
        { field: 'zipCode', headerName: 'Pin Code', width: 180 },
        { field: 'userPhone', headerName: 'Phone', width: 180 },
        {
            field: 'resume',
            headerName: 'Resume',
            width: 180,
            renderCell: (params) => (
                <div>
                    <a
                        href={`${BASE_URL}/${params.row.resume}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Download PDF
                    </a>
                </div>
            ),
        },

        {
            field: 'Actions',
            headerName: 'Actions',
            renderCell: (params) => (
                <>
                    <div className="d-flex justify-content-between align-items-center">
                        <button className="btn btn-sm me-1">
                            <i
                                onClick={() => handleOpen(params.row._id)}
                                className="fa-solid fa-trash mr-2"
                            ></i>
                        </button>
                    </div>
                </>
            ),
            width: 100,
        },
    ];

    const handleDeleteCareer = async (_id) => {
        if (_id) {
            try {
                await axios.delete(`${BASE_URL}/Career/delete/${_id}`);
                // Filter out the deleted property from the properties array
                const updatedEnquiries = properties.filter(
                    (enquiry) => enquiry._id !== _id
                );
                setProperties(updatedEnquiries);
                setSnackbarSeverity('success');
                setSnackbarMessage('Deleted Successfully');
                setSnackbarOpen(true);
                handleClose()
                setTimeout(() => {
                    setSnackbarOpen(false);

                }, 5000);
            } catch (error) {
                console.error('Error deleting Enquiry:', error.response?.data?.message);
                setSnackbarSeverity('error');
                setSnackbarMessage(error.response?.data?.message || 'Error deleting Enquiry');
                setSnackbarOpen(true);
                setTimeout(() => {
                    setSnackbarOpen(false);
                    handleClose()
                }, 5000);
            }
        } else {
            alert('Error !!!');
        }
    };

    return (
        <div>
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

                            />
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
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Are you sure you want to delete?
                    </Typography>
                    <div className="d-flex justify-content-around mt-4">
                        <div className='btn btn-outline-primary' onClick={handleClose}>Cancel</div>
                        <div className='btn btn-outline-danger' onClick={() => handleDeleteCareer(selectedItemId)}>Yes, Delete</div>
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
    )
}

export default ViewAllCareerRequest