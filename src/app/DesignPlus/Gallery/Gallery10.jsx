"use client";
import React, { useState } from 'react';
import 'react-image-lightbox/style.css';
import '../css/style.css';
import './gallery.css';
import BASE_URL from '../../../../config';
import Modal from 'react-bootstrap/Modal';

const Gallery10 = ({ category }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const images = category.Gallery1.map(item => ({ src: item.images_id[0] }));

  const openLightbox = (index) => {
    setPhotoIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setPhotoIndex((photoIndex + 1) % images.length);
  };

  const prevImage = () => {
    setPhotoIndex((photoIndex + images.length - 1) % images.length);
  };

  const chunkArray = (array, size) => {
    const chunkedArray = [];
    for (let i = 0; array && i < array.length; i += size) {
      chunkedArray.push(array.slice(i, i + size));
    }
    return chunkedArray;
  };

  const rowImages = chunkArray(images, 4);

  return (
    <div>
      <div className="container">
        <h2 className="text-center" style={{ paddingBottom: '50px' }}>Gallery of Innovation</h2>
        <div className="container">
          {rowImages.map((row, rowIndex) => (
            <div key={rowIndex}>
              <div className="row">
                {row.map(({ src }, columnIndex) => (
                  <div
                    key={columnIndex}
                    className="col-md-3"
                    onClick={() => openLightbox(rowIndex * 4 + columnIndex)}
                  >
                    <div>
                      <img
                        className='img-responsive mb-2'
                        src={`${BASE_URL}/${src}`}
                        alt={`Portfolio Image ${rowIndex * 4 + columnIndex}`}
                        style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                        loading="lazy"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {lightboxOpen && (
            <Modal
              style={{ background: 'rgba(34, 35, 36, 0)' }}
              show={lightboxOpen}
              onHide={closeLightbox}
              size="xl"
              centered
              dialogClassName="custom-modal"
            >
              <Modal.Body style={{ background: 'rgba(34, 35, 36, 0)' }}>
                <div
                  className='top-0 end-0 fs-2 me-5 fs-1 text-end'
                  style={{ cursor: 'pointer' }}
                  onClick={closeLightbox}
                >
                  <i className="fa-solid fa-xmark text-dark"></i>
                </div>
                <img
                  src={`${BASE_URL}/${images[photoIndex].src}`}
                  alt={`Portfolio Image ${photoIndex}`}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  loading="lazy"
                />

                <div className='position-absolute top-50 start-0 translate-middle-y'>
                  <div
                    className='fs-1'
                    onClick={prevImage}
                    style={{ cursor: 'pointer', transition: 'transform 0.3s ease-in-out' }}
                  >
                    <i className="fa-solid fa-arrow-left"></i>
                  </div>
                </div>
                <div className='position-absolute top-50 end-0 translate-middle-y'>
                  <div
                    className='fs-1'
                    onClick={nextImage}
                    style={{ cursor: 'pointer', transition: 'transform 0.3s ease-in-out' }}
                  >
                    <i className="fa-solid fa-arrow-right"></i>
                  </div>
                </div>
              </Modal.Body>

            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default Gallery10;