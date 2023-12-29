"use client"
import React, { useState } from 'react';
import { DataGrid, GridToolbar, GridPagination } from '@mui/x-data-grid';

const ViewAllWelcomeNote = () => {
    const [properties, setProperties] = useState([]);

   

    const columns = [
        { field: 'BannerName', headerName: 'Welcome Note Heading', width: 180 },
        {
            field: 'Actions',
            headerName: 'Actions',
            renderCell: (params) => (
                <>
                    <div className="d-flex justify-content-between align-items-center">
                        <button className='btn btn-sm me-1'>
                            <i onClick={() => handleDeleteBanner(params.row.id)} className="fa-solid fa-trash mr-2"></i>
                        </button>
                    </div>
                </>
            ),
            width: 120
        },
    ];

    return (
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
                            checkboxSelection
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewAllWelcomeNote;
