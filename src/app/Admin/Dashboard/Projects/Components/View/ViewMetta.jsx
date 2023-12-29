"use client";

import React from "react";
import { Table } from "react-bootstrap";

const ViewMetta = ({ projectDetail }) => {
    return (
        <div className='container mt-5'>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Page Title</th>
                        <th>Meta Title</th>
                        <th>Meta Description</th>
                        <th>Meta Keywords</th>
                        <th>Url</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{projectDetail.title}</td>
                        <td>{projectDetail.metatitle}</td>
                        <td>{projectDetail.description}</td>
                        <td>{projectDetail.keywords}</td>
                        <td>{projectDetail.projectTitleUrl}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
};

export default ViewMetta;
