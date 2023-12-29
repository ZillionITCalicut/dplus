"use client";
import React, { useEffect, useState, useRef } from 'react';
import './BlogHome.css';
import BASE_URL from '../../../../config';
import axios from 'axios';
import ProjectId1 from '../../../../config1';
import Link from 'next/link';


const BlogHome = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);
  const blogHomeRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${BASE_URL}/project/view/${ProjectId1}`;
        const response = await axios.get(url);
        setData(response.data.blog);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setError('Error fetching data. Please try again later.');
      }
    };

    fetchData();
  }, [ProjectId1]);

  useEffect(() => {
    const handleAnimation = () => {
      setIsAnimating(!isHovered); // Pause animation when hovered
    };

    window.addEventListener('mouseover', handleAnimation);
    window.addEventListener('mouseout', handleAnimation);

    return () => {
      window.removeEventListener('mouseover', handleAnimation);
      window.removeEventListener('mouseout', handleAnimation);
    };
  }, [isHovered]);

  useEffect(() => {
    let scrollInterval;

    const startScroll = () => {
      const container = blogHomeRef.current;

      const scrollStep = 2; // Adjust the scroll step as needed
      const scrollSpeed = 30; // Adjust the scroll speed as needed

      const scroll = () => {
        // Scroll to the right
        container.scrollLeft += scrollStep;

        // Check if reached the end of the content
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
          // Reset the scroll position to the beginning
          container.scrollLeft = 0;
        }
      };

      scrollInterval = setInterval(scroll, scrollSpeed);
    };

    startScroll(); // Start scrolling immediately

    return () => {
      clearInterval(scrollInterval);
    };
  }, []);

  return (
    <div>
      <div className="">
        <div className="container mt-5">
          <div className="row d-flex align-items-center">
            <div className="col-md-6">
              <h1>Recent Blog</h1>
            </div>
            <div className="col-md-6 text-start text-md-end">
              <Link href={'/DesignPlus/blog'} className="more">
                View All Blogs <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="">
            <div className="row">
              <div className="col-md-12">
                <div
                  ref={blogHomeRef}
                  className={`blogHome1 ${isAnimating ? '' : 'paused'}`}
                >
                  {data.map((blog) => (
                    <div key={blog._id} className="row">
                      <div className="col-md-4 col-sm-12">
                        <Link href={`/DesignPlus/blog/${blog.BlogTitleUrl}`} className="card">
                          <img src={`${BASE_URL}/${blog.BlogImage}`} alt={blog.BlogHeading} />
                          <div className="overlay text-center">
                            <h3 className="blogHomeh3">{blog.BlogHeading}</h3>
                            <div className="metta">
                              <span>by {blog.BlogAuthor}</span> <span>on {blog.BlogDate}</span>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogHome;
