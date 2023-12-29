import React from 'react';
import Accordion from 'react-bootstrap/Accordion';

const Faq = ({ filteredProjectsLeft, filteredProjectsRight }) => {
    return (
        <div>
            <div className="s-faq g-bg-color--primary1">
                <div className="container g-padding-y-125--xs">
                    <h2 className="g-font-size-32--xs g-font-size-36--md g-text-center--xs g-margin-b-80--xs g-color--white-opacity1">
                        What are the <br /> Frequently Asked Questions?
                    </h2>
                    <div className="row">
                        <div className="col-sm-6 order-sm-1">
                            <Accordion>
                                {filteredProjectsLeft.map((faq, index) => (
                                    <div key={index}>
                                        <Accordion.Item eventKey={index.toString()}>
                                            <Accordion.Header>{faq.FaQqn}</Accordion.Header>
                                            <Accordion.Body>{faq.FaQans}</Accordion.Body>
                                        </Accordion.Item>
                                    </div>
                                ))}
                            </Accordion>
                        </div>

                        <div className="col-sm-6 order-sm-1">
                            <Accordion>
                                {filteredProjectsRight.map((faq, index) => (
                                    <div key={index}>
                                        <Accordion.Item eventKey={index.toString()}>
                                            <Accordion.Header>{faq.FaQqn}</Accordion.Header>
                                            <Accordion.Body>
                                                {faq.FaQans}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </div>
                                ))}
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Faq;
