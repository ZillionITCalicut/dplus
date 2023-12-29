"use client"
import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar, GridPagination } from '@mui/x-data-grid';
import axios from 'axios';
import BASE_URL from '../../../../../../config';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const VIewAllEnquiries = () => {
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
    const [open1, setOpen1] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);

    const handleOpen = (itemId, currentStatus) => {
        setSelectedItemId(itemId);
        setFormData((prevData) => ({
            ...prevData,
            status: currentStatus || '', // Set the current status in formData
        }));
        setOpen(true);
    };
    const handleOpen1 = (itemId, currentStatus) => {
        setSelectedItemId(itemId);
        setFormData((prevData) => ({
            ...prevData,
            status: currentStatus || '', // Set the current status in formData
        }));
        setOpen1(true);
    };

    const handleClose = () => {
        setSelectedItemId(null);
        setOpen(false);
    };

    const handleClose1 = () => {
        setSelectedItemId(null);
        setOpen1(false);
    };

    useEffect(() => {
        const handleFetchEnquiries = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/ViewAll/Enquiries`);
                const propertiesWithIds = response.data.map((property) => ({
                    ...property,
                    id: property._id, // Use _id as the unique identifier
                }));
                setProperties(propertiesWithIds);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        handleFetchEnquiries();

        const intervalId = setInterval(() => {
            handleFetchEnquiries();
        }, 100);

        return () => clearInterval(intervalId);
    }, []);
    const handleDeleteEnquiry = async (_id) => {
        if (_id) {
            try {
                await axios.delete(`${BASE_URL}/Enquiry/delete/${_id}`);
                // Filter out the deleted property from the properties array
                const updatedEnquiries = properties.filter(
                    (enquiry) => enquiry._id !== _id
                );
                setProperties(updatedEnquiries);
                setSnackbarSeverity('success');
                setSnackbarMessage('Enquiry deleted successfully');
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

    const [formData, setFormData] = useState({
        status: ''
    });



    const statusOptions = ['Completed', 'Pending', 'Active', 'Other'];
    const columns = [
        { field: 'userName', headerName: 'Name', width: 180 },
        { field: 'userEmail', headerName: 'E-Mail', width: 180 },
        { field: 'userPhone', headerName: 'Phone', width: 180 },
        { field: 'userMessage', headerName: 'Message', width: 180 },

        {
            field: 'status',
            headerName: 'Status',
            width: 180,
            renderCell: (params) => (
                <select
                    value={params.row.status}
                    onChange={(e) => handleOpen1(params.row._id, e.target.value)}
                >
                    {statusOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
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
            width: 120,
        },
    ];


    const handleUpdateEnquiry = async (selectedItemId) => {

        if (formData) {
            /* console.log(formData); */
            // Additional logic for updating the enquiry

            try {
                const response = await axios.post(`${BASE_URL}/Enquiry/update/${selectedItemId}`, formData);
                console.log(response.data.message);

                setSnackbarSeverity('success');
                setSnackbarMessage(response.data.message);
                setSnackbarOpen(true);
                handleClose1();
                setTimeout(() => {
                    setSnackbarOpen(false)
                }, 4000);


            } catch (error) {
                console.error('Error fetching data:', error);
                setSnackbarSeverity('error');
                setSnackbarMessage(error.response.data.message);
                setSnackbarOpen(true);
            }
        } else {
            console.error('formData is null or undefined');
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
                            /*   checkboxSelection */
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
                        Are you sure you want to delete this Question?
                    </Typography>
                    <div className="d-flex justify-content-around mt-4">
                        <div className='btn btn-outline-primary' onClick={handleClose}>Cancel</div>
                        <div className='btn btn-outline-danger' onClick={() => handleDeleteEnquiry(selectedItemId)}>Yes, Delete</div>
                    </div>
                </Box>
            </Modal>

            <Modal
                open={open1}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Are you sure you want to Update Status?, <p className='text-primary'>{formData.status}</p>
                    </Typography>
                    <div className="d-flex justify-content-around mt-4">
                        <div className='btn btn-outline-primary' onClick={handleClose1}>Cancel</div>
                        <div className='btn btn-outline-danger' onClick={() => handleUpdateEnquiry(selectedItemId)}>Update</div>
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
};

export default VIewAllEnquiries;
