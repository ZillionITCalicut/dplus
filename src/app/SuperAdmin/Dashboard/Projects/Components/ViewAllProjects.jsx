import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar, GridPagination } from '@mui/x-data-grid';
import BASE_URL from '../../../../../../config';

const ViewAllProjects = () => {
    const [properties, setProperties] = useState([]);

    const columns = [
        { field: 'projectName', headerName: 'Project Name', width: 180 },
        { field: 'projectOwnerName', headerName: 'Owner Name', width: 180 },
        { field: 'phone', headerName: 'Phone', width: 180 },
        { field: 'email', headerName: 'E-mail', width: 180 },
        { field: 'city', headerName: 'City', width: 180 },
        { field: 'address', headerName: 'Address', width: 180 },
        {
            field: 'Actions', headerName: 'Actions', renderCell: (params) => (
                <>
                    <div className="d-flex justify-content-between align-items-center">
                        <button className='btn  btn-sm me-1'><i onClick={() => handleDeleteProject(params.row._id)} className="fa-solid fa-trash  mr-2"></i></button>

                        {/*  <Link className="btn  btn-sm me-1" href={`/Main/AdminLogin/AdminDashboard/Property/${params.row.id}`}>
                            <i className="fa-solid fa-pen"></i>
                        </Link>

                        <Button onClick={() => handleShowPropertyDetail(params.row)}>
                            <i className="fa-solid fa-eye"></i>
                        </Button>

                        <Link
                            href={`/Main/UserHome/Property_Details/${params.row.propertyName1}`}
                            onClick={() => {
                                // Delete the token from sessionStorage
                                sessionStorage.removeItem('token');
                                // Redirect to the Property Details page
                                window.location.href = `/Main/UserHome/Property_Details/${params.row.propertyName1}`;
                            }}
                        >
                            <i className="fa-solid fa-globe ms-3 fs-5 text-dark"></i>
                        </Link> */}


                    </div>
                </>
            ), width: 180
        },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/ViewAll/Projects-SuperAdmin`);
                setProperties(response.data.map(row => ({ id: row._id, ...row })));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Initial fetch

        const intervalId = setInterval(() => {
            fetchData();
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const handleDeleteProject = async (projectId) => {
        if (projectId) {
            const confirmation = window.confirm(
                "Are you sure you want to delete?"
            );
            if (confirmation) {
                try {
                    // Delete the property
                    const response = await axios.delete(`${BASE_URL}/Projects-SuperAdmin/${projectId}`);
                    console.log(response.data);

                } catch (error) {
                    console.error('Error deleting property:', error);
                }
            }
        } else {
            alert('Cannot Delete');
        }
    };

    return (
        <div>
            <div className="row">
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
                        checkboxSelection
                    />
                </div>
            </div>
        </div>
    );
};

export default ViewAllProjects;
