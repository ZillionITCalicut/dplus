// Sidebar.jsx
import React, { useState } from 'react';
import './sidebar.css';
import Link from 'next/link';

const Sidebar = () => {
    const menuItems = ['Dashboard', 'Project'];
    const [selectedItem, setSelectedItem] = useState('Dashboard');

    const customUrls = {
        Dashboard: '/SuperAdmin/Dashboard/home',
        Project: '/SuperAdmin/Dashboard/Projects'
    };

    const handleMenuItemClick = (item) => {
        setSelectedItem(item);
        // Add logic to handle the click event or navigate to the selected item
    };

    return (
        <div className="sidebar border " style={{ minHeight: '100vh', color: 'black' }}>
            <div className="row" style={{ backgroundColor: 'white' }}>
                <div className="col d-flex justify-content-center">
                    <img src="/Logo/12.png" alt="logo.jpg" />
                </div>
            </div>
            <div className='mt-5 mb-5'>
                {menuItems.map((item, index) => (
                    <Link key={index} href={customUrls[item]} style={{ textDecoration: 'none', color: 'black' }}>
                        <div
                            className={`rounded rounded-4 mt-1 pt-2 pb-2 ml-5 mr-5 menu-item ${selectedItem === item ? 'active' : ''}`}
                            style={{ cursor: 'pointer', textAlign: 'center' }}
                            onClick={() => handleMenuItemClick(item)} >
                            {item}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
