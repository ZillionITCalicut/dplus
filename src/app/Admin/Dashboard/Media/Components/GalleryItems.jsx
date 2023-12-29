import React from 'react'
import BASE_URL from '../../../../../../config';

const GalleryItems = ({ category }) => {
   /*  console.log(category); */



    return (
        <div className="container">
            <div className="row">
                {category.Gallery1.map((galleryItem, index) => (
                    <div
                        key={index}
                        className="col-md-3"
                        onClick={() => openLightbox(index)}
                    >
                        <div>
                            <img
                                className="img-responsive mb-2"
                                src={`${BASE_URL}/${galleryItem.images_id[0]} `}
                                alt={`Image ${index}`}
                                style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                                loading="lazy"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default GalleryItems