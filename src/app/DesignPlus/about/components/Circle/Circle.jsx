"use client"
// Circle.js
import { useState, useEffect } from 'react';
import './Circle.css';
import '../../../../components/Header/header.css'
import '../../../css/style.css'
import '../../../../styles/style.css'

const Circle = () => {
       const [activeTab, setActiveTab] = useState(6);

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

    return (
        <div>
            <section className="iq-features">
                <div className="container ">
                    <h2 className='text-center'>How it Works</h2>
                    <div className="row">
                        <div className="holderCircle" style={{marginTop:'0px'}}>
                            <div className="round"></div>
                            <div className="dotCircle text-center">
                                {[1, 2, 3, 4, 5, 6].map((index) => (
                                    <span
                                        key={index}
                                        className={`itemDot fs-4 d-flex align-items-center justify-content-center text-center ${activeTab === index ? 'active' : ''}`}
                                        data-tab={index}
                                        onClick={() => setActiveTab(index)}
                                    >
                                        <p className='circlepara text-center'>{getTitle(index)}</p>
                                        <span className="forActive"></span>
                                    </span>
                                ))}
                            </div>
                            <div className="contentCircle text-center ">
                                {[1, 2, 3, 4, 5, 6].map((index) => (
                                    <div
                                        key={index}
                                        className={`CirItem title-box d-flex align-items-center justify-content-center text-center ${activeTab === index ? 'active' : ''}`}
                                    >
                                        <h2 className="serviceHeading">
                                            <span>{getTitle1(index)}</span>
                                        </h2>
                                       {/*  <i className={`fa fa-${getIconName(index)}`}></i> */}
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

const getIconName = (index) => {
    switch (index) {
        case 1:
            return 'building';
        case 2:
            return 'upload';
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

const getTitle = (index) => {
    switch (index) {
        case 1:
            return ' Design contract ';
        case 2:
            return 'Vizualization  ';
        case 3:
            return ' Drawings';
        case 4:
            return 'Selection of meterials';
        case 5:
            return 'Project control ';
        case 6:
            return 'Presentation ';
        default:
            return '';
    }
};

const getTitle1 = (index) => {
    switch (index) {
        case 1:
            return 'Material Selection Expertise';
        case 2:
            return 'Contractual Design Agreements';
        case 3:
            return 'Detailed Architectural Sketches';
        case 4:
            return 'Creative Project Imaging';
        case 5:
            return 'Efficient Project Management';
        case 6:
            return 'Compelling Design Showcases';
        default:
            return '';
    }
};

export default Circle;
