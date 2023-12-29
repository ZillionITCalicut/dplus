"use client"
import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header1';
import Footer from '../components/Footer/Footer';
import axios from 'axios';
import BASE_URL from '../../../config';
import ProjectId1 from '../../../config1';


const Layout = ({ children }) => {
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
            }
        };

        fetchMetaDetails();
    }, []);

    // Filter data for the "Home" page
    const homePageData = data.find((item) => item.page === 'BlogPage');

    return (
        <div>
            <title>{homePageData?.title || metaDetails.title}</title>
            <meta name="description" content={homePageData?.description || metaDetails.description} />
            <meta name="keywords" content={homePageData?.keywords || metaDetails.keywords} />

            <Header />

            {children}
            <Footer />
        </div>
    );
};

export default Layout;
