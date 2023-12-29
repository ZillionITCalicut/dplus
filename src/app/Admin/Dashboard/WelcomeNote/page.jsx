"use client"
import React, { useState } from 'react'
import ViewAllWelcomeNote from './Components/ViewAllWelcomeNote'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';

const WelcomeNote = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddBanner = async (e) => {
        e.preventDefault();
        try {
            // Extract file name
            const fileName = formData5.banner;
            console.log(formData5);
            // Create FormData with only the file name
            const formData = new FormData();
            formData.append('banner', fileName);
            formData.append('id', id1);
            formData.append('BannerName', formData5.BannerName);
            formData.append('bannerStatus', formData5.bannerStatus);

            /* console.log(formData); */

            const response = await axios.post(`${BASE_URL}/add-banner`, formData);
            alert(response.data.message);

            // Reset form fields
            setFormData5({
                id: id1,
                BannerName: '',
                bannerStatus: 'Active'
            });

            setSelectedPhoto(null);
            setImagePreview(null);

            handleClose();
            /* location.reload(); */
        } catch (error) {
            console.error('Error adding Banner:', error.response.data.error);
        }
    };

    return (
        <div>

            <div className="row mt-2 mb-4 text-end">
                <div className="col-md-12">
                    <div className='btn btn-primary me-5' onClick={handleShow}>
                        Add Welcome Note
                    </div>
                </div>
            </div>

            <ViewAllWelcomeNote />

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Welcome Note</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Banner Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Banner Name"
                            autoFocus
                            name="BannerName"
                        /*   value={formData5.BannerName}
                          onChange={handleChange} */
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddBanner}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default WelcomeNote