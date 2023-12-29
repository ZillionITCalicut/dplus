"use client";
import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Fade from '@mui/material/Fade';
import ProjectId1 from '../../../../config1';
import axios from 'axios';
import BASE_URL from '../../../../config';
import '../../styles/style.css'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: 'San Francisco - Oakland Bay Bridge, United States',
    imgPath: '/img/banner123.jpg',
  },
  {
    label: 'Bird',
    imgPath: '/img/banner321.jpg',
  },
  {
    label: 'Bali, Indonesia',
    imgPath: '/img/banner1245.jpg',
  },
  {
    label: 'Goč, Serbia',
    imgPath: '/img/banner321.jpg',
  },
];

const Banner = () => {
  const [projectData, setProjectData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/project/view/${ProjectId1}`);
        setProjectData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  console.log(projectData);
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep - 1 + maxSteps) % maxSteps);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  return (
    <div style={{ position: 'relative' }}>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        interval={3000}
      >
        {images.map((step, index) => (
          <div key={step.label}>
            <Fade in={Math.abs(activeStep - index) <= 2}>
              <Box
                component="img"
                sx={{
                  display: 'block',
                  overflow: 'hidden',
                  width: '100%',
                }}
            
                src={step.imgPath}
                alt={step.label}
                className='bannerimg'
              />
            </Fade>
          </div>
        ))}
      </AutoPlaySwipeableViews>

      <Button
        sx={{ position: 'absolute', top: '50%', left: '5%' }}
        size="small"
        className='btn btn-light'
        onClick={handleBack}
      >
        <i className="fa-solid fa-caret-left"></i>
      </Button>
      <Button
        sx={{ position: 'absolute', top: '50%', right: '5%' }}
        size="small"
        className='btn btn-light'
        onClick={handleNext}
      >
        <i className="fa-solid fa-caret-right"></i>
      </Button>
    </div>
  );
};

export default Banner;
