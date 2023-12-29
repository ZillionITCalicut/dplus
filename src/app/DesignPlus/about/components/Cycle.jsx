"use client"

import React, { useState, useEffect } from 'react';
import './cycle.css';
import '../../css/style.css'
import '../../../components/Header/header.css'
import '../../../styles/style.css'

const Cycle = () => {
    const [activeTab, setActiveTab] = useState(1);

    useEffect(() => {
        const radius = 200;
        const fields = document.querySelectorAll('.itemDot');
        const container = document.querySelector('.dotCircle');
        const width = container.clientWidth;
        const calculatedRadius = width / 2.5;

        const height = container.clientHeight;
        const step = (2 * Math.PI) / fields.length;

        fields.forEach((field, index) => {
            const x = Math.round(width / 2 + calculatedRadius * Math.cos(index * step) - field.clientWidth / 2);
            const y = Math.round(height / 2 + calculatedRadius * Math.sin(index * step) - field.clientHeight / 2);

            field.style.left = `${x}px`;
            field.style.top = `${y}px`;
        });

        const interval = setInterval(() => {
            let nextTab = activeTab + 1;
            if (nextTab > 6) {
                nextTab = 1;
            }

            setActiveTab(nextTab);
        }, 5000);

        return () => clearInterval(interval);
    }, [activeTab]);

    const getTitle = (index) => {
        switch (index) {
            case 1:
                return 'Architectural Designs';
            case 2:
                return 'Client Consultation';
            case 3:
                return 'Professional Team';
            case 4:
                return 'Project Management';
            case 5:
                return 'Document Submission';
            case 6:
                return 'Client Support';
            default:
                return '';
        }
    };

    const getIconName = (index) => {
        switch (index) {
            case 1:
                return 'building';
            case 2:
                return 'comments';
            case 3:
                return 'user';
            case 4:
                return 'tags';
            case 5:
                return 'upload';
            case 6:
                return 'briefcase';
            default:
                return '';
        }
    };

    return (
        <div>
            <section className="iq-features">
                <div className="container">
                    <div className="row ">
                        <div className="holderCircle">
                            <div className="round"></div>
                            <div
                                className="dotCircle"
                                style={{
                                    transform: `rotate(${360 - (activeTab - 1) * 60}deg)`,
                                    transition: '2s',
                                }}
                            >
                                {[1, 2, 3, 4, 5, 6].map((index) => (
                                    <span
                                        key={index}
                                        className={`itemDot ${activeTab === index ? 'active' : ''}`}
                                        data-tab={index}
                                        onClick={() => setActiveTab(index)}
                                        style={{
                                            transform: `rotate(${(index - 1) * 60}deg)`,
                                            transition: '1s',
                                        }}
                                    >
                                        <p>{getTitle(index)}</p>
                                        <span className="forActive"></span>
                                    </span>
                                ))}
                            </div>
                            <div className="contentCircle">
                                {[1, 2, 3, 4, 5, 6].map((index) => (
                                    <div
                                        key={index}
                                        className={`CirItem title-box ${activeTab === index ? 'active' : ''}`}
                                    >
                                        <h2 className="title" style={{ fontSize: '18px' }}>
                                            <span>{getTitle(index)}</span>
                                        </h2>
                                        <i className={`fa fa-${getIconName(index)}`}></i>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Cycle;
