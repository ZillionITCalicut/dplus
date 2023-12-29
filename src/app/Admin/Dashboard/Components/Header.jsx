import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import BASE_URL from '../../../../../config';

const Header = ({ toggleSidebar }) => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        const id = sessionStorage.getItem('userId');
        setId(id);
      /*   console.log(id); */
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/project/view/${id}`);
                console.log(response.data.projectName);
                setName(response.data.projectName);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleAvatarClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const clearSessionStorage = () => {
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('verify');
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('username');
    };

    // Example of logout button click handler
    const handleLogout = () => {
        // Call the function to clear sessionStorage items
        clearSessionStorage();

        // Redirect to the login page or perform any other logout actions
        window.location.href = '/Admin'; // Change the URL to your logout or login page
    };

    // Extracting the first letter of the name
    const firstLetter = name ? name.charAt(0) : '';

    return (
        <div className='d-flex justify-content-between align-items-center'>
            <div>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={toggleSidebar}
                >
                    <i className="fa-solid fa-bars"></i>
                </IconButton>
            </div>
            <div className='mr-5 mt-3'>
                <Avatar
                    sx={{ backgroundColor: '#1f6cfa', cursor: 'pointer' }}
                    onClick={handleAvatarClick}
                >
                    {firstLetter}
                </Avatar>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}><i className="fa-solid fa-user me-3"></i> Account</MenuItem>
                    <MenuItem onClick={handleLogout}> <i className="fa-solid fa-lock me-3"></i> Sign Out</MenuItem>
                </Menu>
            </div>
        </div>
    );
};

export default Header;
