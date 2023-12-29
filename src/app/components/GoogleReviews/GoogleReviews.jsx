"use client"

import React, { useEffect, useState } from 'react';
import './GoogleReviews.css'
const GoogleReviews = () => {
    const [reviews, setReviews] = useState([]);

    // Dummy data for testing
    const dummyData = [
        {
            time: 1633449600,
            text: 'Great place! Highly recommend.',
            rating: 5,
            author_name: 'John Doe'
        },
       /*  {
            time: 1633446000,
            text: 'Amazing experience. Will visit again.',
            rating: 4,
            author_name: 'Jane Smith'
        }, */
        // Add more dummy reviews as needed
    ];

    useEffect(() => {
        // Simulate an asynchronous request
        const simulateFetchReviews = () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(dummyData);
                }, 1000); // Simulate a 1-second delay
            });
        };

        const fetchReviews = async () => {
            try {
                const response = await simulateFetchReviews();
                setReviews(response);
            } catch (error) {
                console.error('Error fetching Google Reviews:', error);
                setReviews([]);
            }
        };

        fetchReviews();
    }, []);

    return (
<div>
            <h2 style={{ color: 'white' }}>Google Reviews</h2>
            <div className="attractive-div shadow p-3  bg-white rounded">
                <ul>
                    {reviews.map((review) => (
                        <li key={review.time}>
                            <h4 className='text-dark'>{review.author_name}</h4>
                            <p className='text-dark'>" {review.text} "</p>
                          {/*   <p className='text-dark'>Rating: {review.rating}</p> */}
                            <div className="rating">
                                <span className="star">&#9733;</span>
                                <span className="star">&#9733;</span>
                                <span className="star">&#9733;</span>
                                <span className="star">&#9733;</span>
                                <span className="star">&#9733;</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default GoogleReviews;
