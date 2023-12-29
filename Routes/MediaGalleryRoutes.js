// routes/staffRoutes.js
const express = require('express');
const MediaRoutes = require('../Controller/Media');
const multer = require('multer');
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Media_Gallery_Items'); // Set your destination folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

router.post('/GalleryItems/:Project_Id/Gallery/:Category_Id', upload.array('images_id', 10), MediaRoutes.addMediaGalleryImages);

module.exports = router;
