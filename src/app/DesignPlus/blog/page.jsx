"use client"
import React, { useEffect, useState } from 'react';
import '../css/style.css';
import '../../styles/style.css';
import './blog.css';
import '../../components/Header/header.css'

import ProjectId1 from '../../../../config1';  // Assuming ProjectId1 is exported from config1
import axios from 'axios';
import BASE_URL from '../../../../config';
import Link from 'next/link';

const blog = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `${BASE_URL}/project/view/${ProjectId1}`;
                console.log('Request URL:', url);
                const response = await axios.get(url);
                console.log(response.data);
                setData(response.data.blog);
            } catch (error) {
                console.error('Error fetching data:', error.message);
                setError('Error fetching data. Please try again later.');
            }
        };

        fetchData();
    }, [ProjectId1]);


    return (
        <div>
            <div style={{ height: '20px' }}>
            </div>
            <div className="g-bg-color--sky-light">
                <div className="container g-padding-y-80--xs g-padding-y-125--sm">
                    <div className="g-text-center--xs g-margin-b-80--xs">
                        <h2 className="g-font-size-32--xs g-font-size-36--md g-letter-spacing--1">Latest Blog</h2>
                    </div>
                    <div className="blog-area ">
                        <div className="container">
                            <div className="row">
                                {data.map((blogItem, index) => (
                                    <div key={blogItem._id} className="col-md-6 p-1">
                                        <div className="single-blog-post wow fadeInUp" data-wow-delay={`100ms + ${index * 100}ms`} style={{ marginBottom: '100px' }}>
                                            <Link href={`/DesignPlus/blog/${blogItem.BlogTitleUrl}`}>
                                                <div className="blog-post-thumb">
                                                    <img className='blogimg' src={`${BASE_URL}/${blogItem.BlogImage}`} alt="" />
                                                </div>
                                                <div className="post-content text-center">
                                                    <div className="post-date btn palatin-btn">{blogItem.BlogDate}</div>
                                                    <h2>{blogItem.BlogHeading}</h2>
                                                    <div dangerouslySetInnerHTML={{ __html: blogItem.BlogDescription.slice(0, 50) }}></div>
                                                  
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                                {error && <p>{error}</p>}
                            </div>
                            <div className="col-12">
                                <div className="load-more-btn text-center wow fadeInUp" data-wow-delay="700ms">
                                    <Link href="#" className="btn palatin-btn">Load More</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End News */}

        </div>

    )
}

export default blog