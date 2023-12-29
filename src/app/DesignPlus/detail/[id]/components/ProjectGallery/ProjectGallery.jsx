import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import './photoswipe.css';
import '../../../../../styles/style.css';
import BASE_URL from '../../../../../../../config';

const ProjectGallery = ({ gallery }) => {
  const swiperRef = useRef(null);

  const nextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const prevSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  console.log(gallery);

  return (
    <div className="">
      {/*  <h2 className="text-center mt-5">Gallery</h2> */}
      <div className="row justify-content-center">
        <div className="col-md-11">
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={true}
            modules={[EffectCoverflow, Pagination]}
            className="mySwiper"
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            {gallery.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  className='w-100 h-100 img-fluid'
                  src={`${BASE_URL}/${image.image}`}
                  alt={`project.Gallery[${index + 1}].galleryAltTitle`}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className='button-container d-flex justify-content-center'>
            <button onClick={prevSlide}><i className="fa-solid fa-caret-left fs-1 me-5"></i></button>
            <button onClick={nextSlide}><i className="fa-solid fa-caret-right fs-1"></i></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectGallery;
