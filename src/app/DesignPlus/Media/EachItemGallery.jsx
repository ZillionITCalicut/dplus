import React from 'react'
import Gallery10 from '../Gallery/Gallery10';

const EachItemGallery = ({ category, onSuccess }) => {
    const handleBackButtonClick = () => {
        onSuccess(); // Close the EachItemGallery component
    };
    /* console.log(category); */
    return (
        <div>
            <button onClick={handleBackButtonClick}><i className="fa-solid fa-arrow-left fs-3"></i></button>
            <Gallery10 category={category} />
        </div>
    )
}

export default EachItemGallery