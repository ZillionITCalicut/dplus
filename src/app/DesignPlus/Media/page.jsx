// Import necessary modules
"use client"

import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import './media.css'
import axios from 'axios';
import BASE_URL from '../../../../config';
import ProjectId1 from '../../../../config1';
import EachItemGallery from './EachItemGallery';
import '../../styles/style.css'
import '../../components/Header/header.css'


const Media = () => {
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [value, setValue] = React.useState('1');
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleOpenGallery = (category) => {
        setSelectedCategory(category);
    };

    const handleCloseGallery = () => {
        setSelectedCategory(null);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/projects/all`);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();

        const fetchData1 = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/project/view/${ProjectId1}`);
                setData1(response.data.Media);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData1();
    }, []);

    return (
        <div>
            <div style={{ height: '150px' }}></div>
            <div className="container">
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Gallery" value="1" />
                                <Tab label="Videos" value="2" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            {selectedCategory ? (
                                <EachItemGallery category={selectedCategory} onSuccess={handleCloseGallery} />
                            ) : (
                                <div className="row">
                                    {data1.map((item) => (
                                        <div key={item._id} className=" col-md-6 mt-3">
                                            <div className="blogHome">
                                                <div className="card" onClick={() => handleOpenGallery(item)}>
                                                    <img src={`${BASE_URL}/${item.image}`} style={{ height: '350px' }} alt="Card Background" />
                                                    <div className="overlay">
                                                        <div className="metta">
                                                            <span>{`Category: ${item.categoryName}`}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </TabPanel>

                        <TabPanel value="2">
                            <div className="row">
                                {data.map((project) => (
                                    <div key={project._id} className="col-lg-4 col-md-6 col-sm-12 mt-3">
                                        {project.video && project.video.length > 0 && (
                                            <iframe
                                                className='w-100'
                                                height={'300px'}
                                                src={`https://www.youtube.com/embed/${extractYouTubeVideoId(project.video[0].videoUrl)}`}
                                                title={project.video[0].title} // Assuming title is the property in each video item
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                allowFullScreen
                                            ></iframe>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </TabPanel>
                    </TabContext>
                </Box>
            </div>
        </div>
    );
}

const extractYouTubeVideoId = (url) => {
    const match = url.match(/[?&]v=([^?&]+)/) || url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : '';
};

// Export the Medias component
export default Media;
