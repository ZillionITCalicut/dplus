import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import BASE_URL from '../../../../../../config';
import { Alert } from '@mui/material';

const AddTestimonailVideos = ({ onSuccess, handleViewCategories }) => {
  const [formData, setFormData] = useState({
    videoUrl: '',
  });

  const [userId, setUserId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [projectId, setProjectId] = useState('');
  const [isValidUrl, setIsValidUrl] = useState(true); // Added state for validation

  useEffect(() => {
    const storedUserId = sessionStorage.getItem('userId');
    const Category_Id = sessionStorage.getItem('Category_Id');
    const project = sessionStorage.getItem('Selected_Project_Id');
    if (project) {
      setProjectId(project);
    }
    if (storedUserId) {
      setUserId(storedUserId);
    }
    if (Category_Id) {
      setCategoryId(Category_Id);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate URL format
    const match = value.match(/[?&]v=([^?&]+)/) || value.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    setIsValidUrl(!!match);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    /* console.log(formData); */

    if (!isValidUrl) {
      alert('Invalid YouTube URL format');
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/AddYoutubeVideos/${userId}/${categoryId}/${projectId}`, formData);
      console.log(response.data);

      if (onSuccess) {
        onSuccess(response.data.message);
      }
      handleViewCategories();
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error Adding !!!');
    }
  };

  return (
    <div>
      <h5>Example YouTube URL formats:</h5>
      <ul className='border'>
        <li>https://www.youtube.com/watch?v=VIDEO_ID</li>
        <li>https://youtu.be/VIDEO_ID</li>
      </ul>



      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Video Url (Youtube)</Form.Label>
        <Form.Control
          type="text"
          name="videoUrl"
          value={formData.videoUrl}
          placeholder="Enter Video Url"
          onChange={handleChange}
        />
      </Form.Group>

      {!isValidUrl && <div className="text-danger">Invalid YouTube URL format</div>}
      <Alert severity="error" className='animate__animated animate__headShake animate__infinite 	infinite'>Please Make sure that the Input Url is Valid!</Alert>
      <div className='btn btn-success mt-2 mb-5 d-flex justify-content-center' onClick={handleSubmit}>
        <div>
          Update Video <i className="fa-solid fa-video"></i>
        </div>
      </div>
    </div>
  );
};

export default AddTestimonailVideos;
