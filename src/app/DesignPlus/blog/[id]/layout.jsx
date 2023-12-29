"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BASE_URL from '../../../../../config';
import ProjectId1 from '../../../../../config1';

const Layout = ({ children, params }) => {
    const id = params.id;
    console.log(id);

    const [data, setData] = useState([]);
    const [metaDetails, setMetaDetails] = useState({
        title: 'DesignPlus Calicut',
        metatitle: 'DesignPlus Calicut',
        description: 'Default Description',
        keywords: 'default, keywords',
    });

    useEffect(() => {
        const fetchMetaDetails = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/project/view/${ProjectId1}`);
                setData(response.data.blog);
            } catch (error) {
                console.error('Error fetching meta details:', error);
            }
        };

        fetchMetaDetails();
    }, []);


    // Find the item with BlogTitleUrl matching the id
    const specificBlogItem = data.find(item => item.BlogTitleUrl === id);

    // Check if specificBlogItem is defined before accessing its properties
    const blogMeta = {
        title: specificBlogItem?.BlogPageTitle || metaDetails.title,
        metatitle: specificBlogItem?.BlogMetaTitle || metaDetails.title,
        description: specificBlogItem?.BlogMetaDescription || metaDetails.description,
        keywords: specificBlogItem?.BlogMetaKeyword || metaDetails.keywords,
    };

    return (
        <div>
            <title>{blogMeta.title}</title>
            <meta name="title" content={blogMeta.metatitle} />
            <meta name="description" content={blogMeta.description} />
            <meta name="keywords" content={blogMeta.keywords} />


            {children}

        </div>
    );
};

export default Layout;
