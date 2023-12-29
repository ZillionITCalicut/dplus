"use client"

import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import BASE_URL from '../../../../../config';
import axios from 'axios';
import ProjectId1 from '../../../../../config1';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import GalleryCategorised from './Components/GalleryCategorised';

const Media = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState([]);
  const [id1, setId] = useState('');

  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleOpenGallery = (category) => {
    setSelectedCategory(category);
  };

  const handleCloseGallery = () => {
    setSelectedCategory(null);
  };


  const handleClose = () => {
    setSelectedPhoto(null); // Assuming setSelectedPhoto is your state update function
    setShow(false);
    setFormData({
      categoryName: ''

    });
  };

  const handleShow = () => setShow(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const [formData, setFormData] = useState({
    categoryName: '',
    image: null,
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedPhoto(file);
    setFormData({
      ...formData,
      image: file,
    });
  };

  const handleAddCategory = async () => {
    try {
      const formDataInstance = new FormData();
      formDataInstance.append('image', formData.image);
      formDataInstance.append('categoryName', formData.categoryName);

      console.log(formDataInstance);
      const response = await axios.post(`${BASE_URL}/Project/${ProjectId1}/Media`, formDataInstance);
      console.log(response.data);
      setSnackbarSeverity('success');
      setSnackbarMessage(response.data.message);
      setSnackbarOpen(true);
      handleClose()
    } catch (error) {
      console.error('Error uploading image:', error.response.data.message);
      setError(error.response.data.message);
      setSnackbarSeverity('error');
      setSnackbarMessage(error.response.data.message);
      setSnackbarOpen(true);
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  };

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

  const handleDelete = async (Category_Id) => {
    // Display a confirmation dialog
    const isConfirmed = window.confirm('Are you sure you want to delete this item?');

    // Check if the user confirmed the deletion
    if (isConfirmed) {
      try {
        const response = await axios.delete(`${BASE_URL}/delete/${ProjectId1}/media/${Category_Id}`);
        console.log(response.data);
      } catch (error) {
        console.error('Error deleting image:', error.response.data.message);
      }
    } else {
      // Handle if the user canceled the deletion
      console.log('Deletion canceled.');
    }
  };



  return (
    <div className="container">
      <div className="row">
        {selectedCategory ? (
          <GalleryCategorised category={selectedCategory} onSuccess={handleCloseGallery} />
        ) : (
          <div className="row">
            <div className="row">
              <div className="col-md-4 btn btn-outline-dark mt-3" onClick={handleShow}>
                Category
              </div>
            </div>
            <p className="text-danger">{error}</p>
            {data.Media && data.Media.map((category) => (
              <div key={category._id} className="col-md-4">

                <Card sx={{ maxWidth: 345 }} onClick={() => handleOpenGallery(category)}>
                  <img src={`${BASE_URL}/${category.image}`} alt={category.image} />
                  <CardContent>
                    <Typography gutterBottom className='d-flex justify-content-between' component="div">
                      <div>{category.categoryName} </div>
                      <div><i className="fa-solid fa-trash fs-7" onClick={() => handleDelete(category._id)}></i></div>
                    </Typography>
                    <Typography variant="body2" color="text.secondary"></Typography>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Gallery Category </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Category Name"
              value={formData.categoryName}
              onChange={(e) => setFormData({ ...formData, categoryName: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Thumbnail</Form.Label>
            <Form.Control onChange={handleFileChange} type="file" />
          </Form.Group>
          {selectedPhoto && (
            <div className="d-flex flex-wrap">
              <div className="m-2">
                <img
                  src={URL.createObjectURL(selectedPhoto)}
                  alt={`Preview`}
                  style={{ maxWidth: '100px', maxHeight: '100px' }}
                />
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddCategory}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default Media;
