"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BASE_URL from '../../../../config';
import './Portfolio.css'
import '../css/style.css'
import Link from 'next/link';

const Portfolio = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/projects/all`);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching Project:', error.response.data.message);
                return null;
            }
        };
        fetchProjects();
    }, []);



    return (
        <div>
            <section className="g-padding-y-140--xs">
                <div className="container-fluid">
                    <div className="row no-gutters">
                        {data.map((project, index) => (
                            <div className="col-md-6 mt-3 col-lg-3 ftco-animate m-0" key={index}>
                                <Link href={`/DesignPlus/detail/${project.projectTitleUrl}`}>
                                    <div className="project" onClick={() => {
                                        // Store data in localStorage
                                        localStorage.setItem('proIdDP', project._id);
                                        localStorage.setItem('proNaDP', project.projectName);
                                        localStorage.setItem('proCaDP', project.projectCategory);
                                    }}>
                                        {project.Gallery && project.Gallery[0] && (
                                            <>
                                                <img src={`${BASE_URL}/${project.Gallery[0].image}`} alt={project.projectName} />
                                                <div className="text">
                                                    <h3 className="ppp">{project.projectName}</h3>
                                                </div>
                                                <a href={`${BASE_URL}/${project.Gallery[0].image}`} className="icon image-popup d-flex justify-content-center align-items-center">
                                                    <span><i className="fa-solid fa-expand"></i></span>
                                                </a>
                                            </>
                                        )}
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Portfolio;
