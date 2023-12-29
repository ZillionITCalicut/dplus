// Sidebar.jsx
"use client"
import React, { useEffect, useState } from 'react';
import './sidebar.css';
import Link from 'next/link';
import axios from 'axios';
import BASE_URL from '../../../../../config';

const Sidebar = () => {
    const [id, setId] = useState('');

    useEffect(() => {
        const id = sessionStorage.getItem('userId');
        setId(id);
      /*   console.log(id); */
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/project/view/${id}`);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const menuItems = ['Dashboard', 'Banner', 'Projects', 'Media', 'Manage Members', 'Blog', 'Enquiries', 'Career', 'Meta'];
    const [selectedItem, setSelectedItem] = useState('Dashboard');

    const handleMenuItemClick = (item) => {
        setSelectedItem(item);

    };

    const customUrls = {
        Dashboard: '/Admin/Dashboard',
        Banner: '/Admin/Dashboard/Banner',        Projects: `/Admin/Dashboard/Projects`,
        Enquiries: `/Admin/Dashboard/Enquiries`,
        Career: `/Admin/Dashboard/Career`,
        Blog: `/Admin/Dashboard/Blog`,
        Media: `/Admin/Dashboard/Media`,
        'Manage Members': '/Admin/Dashboard/ManageMembers',
        Meta: `/Admin/Dashboard/Metta`,
    };

    return (
        <div className="sidebar border " style={{ minHeight: '100vh', color: 'black', backgroundColor: 'white' }}>
            <div className="row mt-3">
                <div className="col d-flex justify-content-center">
                    <img src="/Logo/logoImg.png"  alt="logo.jpg" />
                </div>
            </div>
            <div className='mt-5 mb-5'>
                {menuItems.map((item, index) => (
                    <Link key={index} href={customUrls[item] || '/'} style={{ textDecoration: 'none', color: 'black' }}>
                        <div
                            className={`rounded rounded-4 mt-1 pt-2 pb-2 ml-5 mr-5 menu-item ${selectedItem === item ? 'active' : ''}`}
                            style={{ cursor: 'pointer', textAlign: 'center' }}
                            onClick={() => handleMenuItemClick(item)}>
                            {item}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
