import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar, GridPagination } from '@mui/x-data-grid';
import BASE_URL from '../../../../../../config';

const ViewAllBanner = () => {


    useEffect(() => {
        const id = sessionStorage.getItem('userId')
        const fetchData = async () => {

            try {
                const response = await axios.get(`${BASE_URL}/Banners/${id}`);
              /*   console.log(response.data); */
                const propertiesWithIds = response.data.map(property => ({
                    ...property,
                    id: property._id, // Set the _id as the id for DataGrid
                }));
                setProperties(propertiesWithIds);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();  // Initial fetch

           const intervalId = setInterval(() => {
            fetchData();
        }, 100);

        return () => clearInterval(intervalId); }, []);


    const [properties, setProperties] = useState([]);

    const columns = [
        { field: 'BannerName', headerName: 'Banner Name', width: 100 },
        {
            field: 'WebsiteBanner',
            headerName: 'Photo',
            width: 180,
            renderCell: (params) => (
                <>
                    <img
                        src={`${BASE_URL}/${params.row.WebsiteBanner}`}
                        alt={`${params.row.WebsiteBanner}`}
                    />
                </>
            ),

        },
        {
            field: 'Actions', headerName: 'Actions', renderCell: (params) => (
                <>
                    <div className="d-flex justify-content-between align-items-center">
                        <button className='btn  btn-sm me-1'><i onClick={() => handleDeleteBanner(params.row.id)} className="fa-solid fa-trash  mr-2"></i></button>
                    </div>
                </>
            ), width: 120
        },

    ];

    const handleDeleteBanner = async (_id) => {
        if (_id) {
            const confirmation = window.confirm("Are you sure you want to delete?");
            if (confirmation) {
                try {
                    await axios.delete(`${BASE_URL}/DeleteBanner/${_id}`);
                    // Filter out the deleted property from the properties array
                    const updatedCategories = properties.filter((property) => property._id !== _id);
                    setProperties(updatedCategories);
                    alert('Deleted Successfully..');
                } catch (error) {
                    console.error('Error deleting Banner:', error);
                }
            }
        } else {
            alert('Cannot Delete');
        }
    };

    return (
        <div>
            <div className="row">  
                <div className="col-md-12">
                    <div style={{ height: 600, width: '100%', backgroundColor: 'whitesmoke' }}>
                        <DataGrid
                            rows={properties}
                            columns={columns}
                            components={{
                                
                                Pagination: GridPagination,
                            }}
                            pagination
                            pageSize={5}
                                                    />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ViewAllBanner;
