"use client"
import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import AddBlog from './Components/AddBlog';
import ViewAllBlog from './Components/ViewAllBlog';
import axios from 'axios';
import BASE_URL from '../../../../../config';

const Blog = () => {
    const [id1, setId] = useState('');

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        const id = sessionStorage.getItem('userId');
        setId(id);

        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/project/view/${id}`);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        const intervalId = setInterval(() => {
            fetchData();
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);


    return (
        <div>
            <div className="row mt-2 mb-4 text-end">
                <div className="col-md-6">
                    <div className='btn btn-outline-dark me-1 w-100' onClick={handleShow}>
                        <i className="fa-solid fa-plus"></i> Add Blog
                    </div>
                </div>

            </div>

            <ViewAllBlog data={data} />

            <Modal show={show} size='lg' onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Blog </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddBlog onSuccess={handleClose} />
                </Modal.Body>

            </Modal>


        </div>
    )
}

export default Blog