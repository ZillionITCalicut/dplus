import React from 'react'

import '../../../css/style.css'
import './process.css'

const Process = () => {
    return (
        <div>
            <div>
                <div className="container">
                    <div className="g-text-center--xs g-margin-b-100--xs">
                        <h2 className="g-font-size-32--xs g-font-size-36--sm">How it Works</h2>
                    </div>
                    <ul className="list-inline row ">
                        {/* Process */}
                        <li className="col-sm-3 col-xs-6 g-full-width--xs s-process-v1 g-margin-b-60--xs g-margin-b-0--md">
                            <div className="center-block g-text-center--xs">
                                <div className="g-margin-b-30--xs text-dark">
                                    <span className="g-display-inline-block--xs g-width-100--xs g-height-100--xs g-font-size-38--xs g-color--primary g-bg-color--white g-box-shadow__dark-lightest-v4 g-padding-x-20--xs g-padding-y-20--xs g-radius--circle">01</span>
                                </div>
                                <div className="g-padding-x-20--xs">
                                    <h3 className="g-font-size-18--xs ">Make an Appointment</h3>
                                    <p className="y">Clinics can be privately operated or publicly managed.</p>
                                </div>
                            </div>
                        </li>
                        {/* End Process */}

                        {/* Process */}
                        <li className="col-sm-3 col-xs-6 g-full-width--xs s-process-v1 g-margin-b-60--xs g-margin-b-0--md">
                            <div className="center-block g-text-center--xs">
                                <div className="g-margin-b-30--xs">
                                    <span className="g-display-inline-block--xs g-width-100--xs g-height-100--xs g-font-size-38--xs g-color--primary g-bg-color--white g-box-shadow__dark-lightest-v4 g-padding-x-20--xs g-padding-y-20--xs g-radius--circle">02</span>
                                </div>
                                <div className="g-padding-x-20--xs">
                                    <h3 className="g-font-size-18--xs ">Primary Diagnostics</h3>
                                    <p className="">Clinics can be privately operated or publicly managed.</p>
                                </div>
                            </div>
                        </li>
                        {/* End Process */}

                        {/* Process */}
                        <li className="col-sm-3 col-xs-6 g-full-width--xs s-process-v1 g-margin-b-60--xs g-margin-b-0--sm">
                            <div className="center-block g-text-center--xs">
                                <div className="g-margin-b-30--xs">
                                    <span className="g-display-inline-block--xs g-width-100--xs g-height-100--xs g-font-size-38--xs g-color--primary g-bg-color--white g-box-shadow__dark-lightest-v4 g-padding-x-20--xs g-padding-y-20--xs g-radius--circle">03</span>
                                </div>
                                <div className="g-padding-x-20--xs">
                                    <h3 className="g-font-size-18--xs ">Daily Course</h3>
                                    <p className="">Clinics can be privately operated or publicly managed.</p>
                                </div>
                            </div>
                        </li>
                        {/* End Process */}

                        {/* Process */}
                        <li className="col-sm-3 col-xs-6 g-full-width--xs s-process-v1">
                            <div className="center-block g-text-center--xs">
                                <div className="g-margin-b-30--xs">
                                    <span className="g-display-inline-block--xs g-width-100--xs g-height-100--xs g-font-size-38--xs g-color--primary g-bg-color--white g-box-shadow__dark-lightest-v4 g-padding-x-20--xs g-padding-y-20--xs g-radius--circle">04</span>
                                </div>
                                <div className="g-padding-x-20--xs">
                                    <h3 className="g-font-size-18--xs ">Be Healthy</h3>
                                    <p className="">Clinics can be privately operated or publicly managed.</p>
                                </div>
                            </div>
                        </li>
                        {/* End Process */}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Process