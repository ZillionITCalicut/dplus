"use client"

import React, { useEffect, useState } from 'react'
import '../../css/style.css'
import '../../../styles/style.css'
import ProjectId1 from '../../../../../config1'
import axios from 'axios'
import BASE_URL from '../../../../../config'
import Link from 'next/link'
import '../../../components/Header/header.css'

const BlogDetails = ({ params }) => {
    const id1 = params.id
    console.log(id1);
    const [properties, setProperties] = useState([]);
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/project/view/${ProjectId1}`);
                const blogData = response.data.blog;
                /*     setData(response.data.blog); */
                // Decode the id1 parameter
                const decodedId1 = decodeURIComponent(id1);

                // Find the blog with matching decoded id1
                const matchedBlog = blogData.find(blog => blog.BlogTitleUrl === decodedId1);

                if (matchedBlog) {
                    // Log the matched blog data
                    setProperties(matchedBlog);
                    const otherBlogsList = blogData.filter(blog => blog.BlogTitleUrl !== decodedId1);
                    setData(otherBlogsList);
                } else {
                    console.log(`Blog with id ${decodedId1} not found`);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id1]);

    console.log(data);
    console.log(properties);
    return (
        <section>
            <div className="container g-padding-y-80--xs g-padding-y-125--sm mt-5">
                <div className="row">
                    {properties && (
                        <div className="col-lg-7 mb-4 mb-lg-0">
                            <img className="img-fluid rounded" src={`${BASE_URL}/${properties.BlogImage} `} alt={properties.BlogHeading} />
                            <h2 className="mt-4 text-transform-none fw-medium">{properties.BlogHeading}</h2>
                            <div className="mb-4 d-flex">
                                By
                                <span className="mx-2 text-700">|</span>
                                <div className="text-700">{properties.BlogAuthor}</div>

                                <span className="mx-2 text-700">|</span>
                                <div className="text-700">{properties.BlogDate}</div>
                                <span className="mx-2 text-700">|</span>
                                <div className="text-700">{properties.Category}</div>
                            </div>
                            <div dangerouslySetInnerHTML={{ __html: properties.BlogDescription }}></div>
                            <div dangerouslySetInnerHTML={{ __html: properties.BlogDescription1 }}></div>
                            <div dangerouslySetInnerHTML={{ __html: properties.BlogDescription2 }}></div>
                            <div dangerouslySetInnerHTML={{ __html: properties.BlogDescription3 }}></div>

                        </div>
                    )}
                    <div className="col-lg-5 ps-lg-7">
                        <h4 className="mt-4 mb-3 fw-normal">Popular Posts</h4>

                        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                            {data.map(blog => (
                                <div key={blog.BlogHeading} className="d-flex mb-3">
                                    <Link href={`/DesignPlus/blog/${blog.BlogTitleUrl}`}>
                                        <div className='d-flex'>
                                            <img className="rounded" src={`${BASE_URL}/${blog.BlogImage}`} width="120" alt="" />

                                            <div className="flex-1 ms-3">
                                                <h5 className="lh-sm mt-0 text-transform-none fs-0 mb-1 fw-semi-bold font-base">
                                                    <a className="text-900" href={`../pages/single-post.html`}>{blog.BlogHeading}</a>
                                                </h5>
                                                <p className="text-600 mb-0">{blog.BlogDate}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </section>


    )
}

export default BlogDetails