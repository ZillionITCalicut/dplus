// Header.jsx
import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Header = ({ toggleSidebar }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleAvatarClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const clearSessionStorage = () => {
        sessionStorage.removeItem('id91');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('verify');
        sessionStorage.removeItem('username');
    };

    // Example of logout button click handler
    const handleLogout = () => {
        // Call the function to clear sessionStorage items
        clearSessionStorage();

        // Redirect to the login page or perform any other logout actions
        window.location.href = '/SuperAdmin'; // Change the URL to your logout or login page
    };


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
                    sx={{ backgroundColor: '#4527a0', cursor: 'pointer' }}
                    onClick={handleAvatarClick}
                >
                    Z
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
