"use client";

import React, { useState, useEffect } from 'react';
import './Banner/banner.css';
import axios from 'axios';
import BASE_URL from '../../../config';
import ProjectId1 from '../../../config1';
import Skeleton from '@mui/material/Skeleton';

const Banner1 = () => {
    const [properties, setProperties] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/Banners/${ProjectId1}`);
                const propertiesWithIds = response.data.map(property => ({
                    ...property,
                    id: property._id, // Set the _id as the id for DataGrid
                }));
                setProperties(propertiesWithIds);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? properties.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === properties.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };

    // AutoPlay functionality
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 4000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    return (
        <div className='relative group overflow-hidden h-[1000px] slider-wrapper bannerimg'>
            {/* Loading Skeleton */}
            {loading && (
                <div className='container'>
                    <Skeleton
                        className='mt-2 mb-2'
                        variant="rectangular"
                        height={200} // Set the height according to your design
                        animation="wave"
                    />
                    <Skeleton
                        className='mt-2 mb-2'
                        variant="rectangular"
                        height={300} // Set the height according to your design
                        animation="wave"
                    />
                    <Skeleton
                        className='mt-2 mb-2'
                        variant="rectangular"
                        height={200} // Set the height according to your design
                        animation="wave"
                    />
                    </div>

            )}

                    {/* Slides */}
                    {!loading && properties.map((property, slideIndex) => (
                        <img
                            key={slideIndex}
                            className={`absolute top-0 left-0 w-full h-full bg-center bg-cover duration-500 transform animate__animated   ${currentIndex === slideIndex ? 'animate__fadeIn' : 'animate__fadeOut'
                                }`}
                            src={`${BASE_URL}/${property.WebsiteBanner}`}
                            alt=''
                        />
                    ))}

                    {/* Left Arrow */}
                    <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                        <i className="fa-solid fa-caret-left" onClick={prevSlide} size={30}></i>
                    </div>

                    {/* Right Arrow */}
                    <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                        <i className="fa-solid fa-caret-right" onClick={nextSlide} size={30}></i>
                    </div>

                    {/* Navigation Dots */}
                    <div className='flex top-4 justify-center py-2'>
                        {loading && properties.map((_, slideIndex) => (
                            <div
                                key={slideIndex}
                                onClick={() => goToSlide(slideIndex)}
                                className={`text-2xl cursor-pointer ${currentIndex === slideIndex ? 'text-white' : 'text-gray-300'
                                    }`}
                            >
                                <div
                                    className={`w-4 h-4 mx-2 rounded-full ${currentIndex === slideIndex ? 'bg-dark' : 'bg-gray-300'
                                        }`}
                                ></div>
                            </div>
                        ))}
                    </div>
                </div>
            );
};

            export default Banner1;
