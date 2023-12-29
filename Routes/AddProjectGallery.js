
const express = require('express');
const Gallery = require('../Controller/SuperAdminProjectController');

const multer = require('multer');
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Project_Galley'); // Set your destination folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

router.post('/ProjectId/:id/Category/:Category_Id/Projects/:project', upload.single('image'), Gallery.addProjectGallery);
router.delete('/delete/ProjectId/:id/Category/:Category_Id/Projects/:project/Item/:galleryItemId', Gallery.deleteProjectGalleryItem);


module.exports = router;
