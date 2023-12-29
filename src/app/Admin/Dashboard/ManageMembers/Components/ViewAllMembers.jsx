"use client"
import React, { useEffect, useState } from 'react'
import { DataGrid, GridToolbar, GridPagination } from '@mui/x-data-grid';
import axios from 'axios'
import BASE_URL from '../../../../../../config';
import Modal1 from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const ViewAllMembers = () => {

    const [data, setData] = useState([]);
    const [id1, setId] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        const id = sessionStorage.getItem('userId');
        setId(id);

        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/project/view/${id}`);
                setData(response.data.Member)
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

   /*  console.log(data);
 */
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

    const handleOpen1 = (MemberId) => {
        setSelectedItemId(MemberId);
        setOpen(true);
    };

    const handleClose1 = () => {
        setSelectedItemId(null);
        setOpen(false);
    };

    const columns = [
        { field: 'fullName', headerName: 'Name', width: 180 },
        { field: 'jobRole', headerName: 'Job Role', width: 120 },
        { field: 'phone', headerName: 'Phone', width: 120 },
        { field: 'email', headerName: 'E-Mail', width: 120 },

        {
            field: 'memberFile',
            headerName: 'Member',
            width: 180,
            renderCell: (params) => (
                <img
                    src={`${BASE_URL}/${params.row.memberFile} `}
                    alt="Member"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            ),
        },
        { field: 'status', headerName: 'Status', width: 120 },
        {
            field: 'Actions',
            headerName: 'Actions',
            width: 120,
            renderCell: (params) => (
                <div>
                    {/*  <i
                        className="fa-solid fa-eye fa-lg "
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleOpenBlogDetail(params.row._id)}
                    ></i>
                    <i
                        className="fa-solid fa-image fa-lg ms-3"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleImageClick(params.row._id)}
                    ></i> */}
                    <i
                        className="fa-solid fa-trash fa-lg ms-3"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleOpen1(params.row._id)}
                    ></i>



                </div>
            ),
        },

    ];

    const handleDeleteBlog = async (MemberId) => {
        try {
            const response = await axios.delete(`${BASE_URL}/delete/${id1}/Member/${MemberId}`);

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

    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    <div style={{ height: 1000, width: '100%', backgroundColor: 'whitesmoke' }}>
                        <DataGrid
                            rows={data}
                            columns={columns}
                            components={{
                                Toolbar: GridToolbar,
                                Pagination: GridPagination,
                            }}
                            pagination
                            pageSize={5}
                            /*  checkboxSelection */
                            getRowId={(row) => row._id}
                        />

                    </div>
                </div>
            </div>
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

export default ViewAllMembers