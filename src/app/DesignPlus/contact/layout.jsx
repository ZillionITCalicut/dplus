"use client"
import React, { useEffect, useState } from 'react'

import axios from 'axios';
import BASE_URL from '../../../../config';
import ProjectId1 from '../../../../config1';


const layout = ({ children }) => {

    const [data, setData] = useState([]);
    const [metaDetails, setMetaDetails] = useState({
        title: 'DesignPLus Architecture Kozhikode',
        description: 'Calicut, kerala, designers, buildings, iritty',
        keywords: 'Calicut, kerala, designers, buildings, iritty',
    });

    useEffect(() => {
        const fetchMetaDetails = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/project/view/${ProjectId1}`);
                setData(response.data.Metta);
            } catch (error) {
                console.error('Error fetching meta details:', error);
                console.log(error);
            }
        };

        fetchMetaDetails();
    }, []);

    // Filter data for the "Home" page
    const homePageData = data.find((item) => item.page === 'contact');

    return (
        <div>
            <title>{homePageData?.title || metaDetails.title}</title>
            <meta name="title" content={homePageData?.metatitle || metaDetails.title} />
            <meta name="description" content={homePageData?.description || metaDetails.description} />
            <meta name="keywords" content={homePageData?.keywords || metaDetails.keywords} />

            {children}
        </div>
    )
}

export default layout