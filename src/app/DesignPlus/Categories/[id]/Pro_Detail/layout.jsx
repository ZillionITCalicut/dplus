"use client"

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BASE_URL from '../../../../../../config';

const Layout = ({ children }) => {
    const [data, setData] = useState([]);
    const [metaDetails, setMetaDetails] = useState({
        title: 'Default Title',
        description: 'Default Description',
        keywords: 'default, keywords',
    });

    useEffect(() => {
        const projectNameFromLocalStorage = localStorage.getItem('proNaDP');
        const categoryNameFromLocalStorage = localStorage.getItem('proCaDP');

        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/projects/all`);
                console.log(response.data);

                // Find the first item that matches the conditions
                const selectedItem = response.data.find((project) => (
                    project.projectName === projectNameFromLocalStorage &&
                    project.projectCategory === categoryNameFromLocalStorage
                ));

                if (selectedItem) {
                    setData([selectedItem]);
                    // Set meta details based on the selected item
                    setMetaDetails({
                        title: selectedItem.title,
                        description: selectedItem.description,
                        keywords: selectedItem.keywords,
                    });
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data. Please try again later.');
            }
        };

        fetchData();
    }, []);

    console.log(data);

    return (
        <div>
            <title>{metaDetails.title}</title>
            <meta name="description" content={metaDetails.description} />
            <meta name="keywords" content={metaDetails.keywords} />

            {children}
        </div>
    );
};

export default Layout;
