import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import axios from 'axios';
import BASE_URL from '../../../../../../../config';

const ViewLocation = ({ projectDetail }) => {


    const [userId, setUserId] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [projectId, setProjectId] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/projects/all`);
             
                const storedUserId = sessionStorage.getItem('userId');
                const storedCategory_Id = sessionStorage.getItem('Category_Id');
                const project = sessionStorage.getItem('Selected_Project_Id');

                if (project) {
                    setProjectId(project);
                }
                if (storedUserId) {
                    setUserId(storedUserId);
                }
                if (storedCategory_Id) {
                    setCategoryId(storedCategory_Id);

                    // Filter the data array based on storedCategory_Id
                    const selectedItem = response.data.find(item => item.category_Id === storedCategory_Id);

                    setData(selectedItem);
                }
            } catch (error) {
                console.error('Error fetching Project:', error.response.data.message);
            }
        };

        fetchProjects();

        const intervalId = setInterval(() => {
            fetchProjects();
        }, 100);

        return () => clearInterval(intervalId);

    }, [setUserId, setCategoryId, setProjectId]);

    const { gmapUrl } = data;
    return (
        <div>
            <h2>View Location</h2>
            {gmapUrl && (
                <div className='mt-4 mb-5'>
                    <p>GMap URL:</p>
                    <i className="fa-solid fa-location-crosshairs fa-2xl me-2"></i>
                    <Link href={gmapUrl} target="_blank" rel="noopener noreferrer">
                        {gmapUrl}
                    </Link>
                    <div className="mt-2">
                        <p>QR Code:</p>
                        <QRCode value={gmapUrl} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewLocation;
