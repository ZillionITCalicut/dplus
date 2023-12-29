
"use client"
import React, { useState } from 'react';
import 'react-image-lightbox/style.css';
import '../../../../DesignPlus/css/style.css';
import Lightbox from 'react-image-lightbox';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ProjectId1 from '../../../../../../config1';
import axios from 'axios';
import BASE_URL from '../../../../../../config';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import GalleryItems from './GalleryItems';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const GalleryCategorised = ({ category }) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');


    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);
    const [selectedImages, setSelectedImages] = useState([]);
    const [uploading, setUploading] = useState(false);



    const openLightbox = (index) => {
        setPhotoIndex(index);
        setLightboxOpen(true);
    };

    const handleFileChange = (e) => {
        const files = e.target.files;

        if (files.length > 0) {
            const newImages = Array.from(files).map((file) => ({
                file,
                src: URL.createObjectURL(file),
            }));

            setSelectedImages([...selectedImages, ...newImages]);
        }
    };

    const handleUpload = async () => {
        try {
            setUploading(true);

            const formData = new FormData();
            selectedImages.forEach((image) => {
                formData.append('images_id', image.file);
            });

            const response = await axios.post(`${BASE_URL}/GalleryItems/${ProjectId1}/Gallery/${category._id}`, formData);
            console.log(response.data.message);


            setSnackbarSeverity('success');
            setSnackbarMessage(response.data.message);
            setSnackbarOpen(true);

        } catch (error) {
            console.error('Error uploading images:', error);
                       setSnackbarSeverity('error');
            setSnackbarMessage(error.response.data.message);
            setSnackbarOpen(true);
            setTimeout(() => {
                setError('');
            }, 3000);
        } finally {
            setUploading(false);
        }
    };



    return (
        <div>
            <Button
                component="label"
                className="w-100"
                style={{ height: '75px', border: '1px solid black' }}
                startIcon={<CloudUploadIcon />}
            >
                Upload files
                <VisuallyHiddenInput type="file" onChange={handleFileChange} multiple />
            </Button>


            <div className="container">
                <div className="row mt-3">
                    {selectedImages.map(({ src }, index) => (
                        <div key={index} className="col-md-3">
                            <div onClick={() => openLightbox(index)}>
                                <img
                                    className="img-responsive mb-2"
                                    src={src}
                                    alt={`Uploaded Image Preview ${index + 1}`}
                                    style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="row mt-3">
                    <div className="col-md-12">
                        <div className="btn btn-success w-100" onClick={handleUpload} disabled={uploading}>
                            {uploading ? 'Uploading...' : 'Upload'}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container g-padding-y-50--xs">
                <h2 className="text-center" style={{ paddingBottom: '50px' }}>
                    {category.categoryName}
                </h2>
                <GalleryItems category={category} />

            </div>

            {lightboxOpen && (
                <Lightbox
                    mainSrc={selectedImages[photoIndex].src}
                    nextSrc={selectedImages[(photoIndex + 1) % selectedImages.length].src}
                    prevSrc={selectedImages[(photoIndex + selectedImages.length - 1) % selectedImages.length].src}
                    onCloseRequest={() => setLightboxOpen(false)}
                    onMovePrevRequest={() => setPhotoIndex((photoIndex + selectedImages.length - 1) % selectedImages.length)}
                    onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % selectedImages.length)}
                />
            )}
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

export default GalleryCategorised;