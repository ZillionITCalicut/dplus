// Layout.jsx
"use client"
import React, { useEffect, useState } from 'react';
import Sidebar from './Components/Sidebar';
import Header from './Components/Header';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import BASE_URL from '../../../../config';

const Layout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [loading, setLoading] = useState(true);
    const [id, setId] = useState('');
    const [error, setError] = useState(null);
    const [isDataFetched, setIsDataFetched] = useState(false); // New state variable

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = sessionStorage.getItem('verify');
                const response = await axios.get(`${BASE_URL}/AdminDashboard`, {
                    headers: {
                        authorization: token,
                    },
                });
                /* console.log(response.data); */
                const userId = response.data.userId;
                /* console.log('API userId:', userId); */

                const id = sessionStorage.getItem('userId');
                const fetchData = async () => {
                    try {
                        const response = await axios.get(`${BASE_URL}/project/view/${id}`);
                        setId(response.data._id);

                    } catch (error) {
                        console.error('Error fetching data:', error);
                        setLoading(false);
                    }
                };
                fetchData();

                // Retrieve the username from sessionStorage
                const storedUsername = sessionStorage.getItem('userId');
                /*  console.log('Stored username:', storedUsername); */

                if (String(storedUsername) !== String(id)) {
                    /*     window.location.href = `/Admin`; */
                    setIsDataFetched(false);
                    setLoading(false);
                   /*  console.log('Mismatch detected'); */
                    console.error('Unauthorized access: username mismatch');
                    console.error('Mismatch details:', {
                        storedUsername,
                        userId,
                        storedUsernameType: typeof storedUsername,
                        userIdType: typeof userId,
                    });

                    return;
                }
                sessionStorage.setItem('id91', userId);

                // Reset error state on successful fetch
                setError(null);
                setIsDataFetched(true); // Mark data fetching as complete
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error); // Set the error state
                window.location.href = `/Admin`;
            } finally {
                setLoading(false);
            }
        };

        fetchData(); // Initial fetch

 /*  const intervalId = setInterval(() => {
            fetchData();
        }, 1000);

        return () => clearInterval(intervalId); */    }, []);

    return (
        <>
            {loading ? (
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
            ) : error ? (
                <div className="container">
                    <div className='text-center mt-5'>loading... <CircularProgress color="secondary" /></div>
                </div>
            ) : isDataFetched ? (

                <div style={{ width: '98%', marginRight: '1%', marginLeft: '1%' }}>
                    <div className={`row ${isSidebarOpen ? '' : 'collapsed'}`}>
                        {isSidebarOpen && (
                            <div className="col-md-2" style={{ transition: 'all 0.3s ease-in-out' }}>
                                <Sidebar />
                            </div>
                        )}
                        <div className={`col-md-${isSidebarOpen ? '10' : '12'} content-scroll`} >
                            <div className="main-content">
                                <Header toggleSidebar={toggleSidebar} />
                                <div className='border mt-4' style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 100px)' }}>
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            ) : null}
        </>
    );
};

export default Layout;
