// routes/staffRoutes.js
const express = require('express');
const MediaRoutes = require('../Controller/Media');
const multer = require('multer');
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Media_Galley'); // Set your destination folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

router.post('/Project/:Project_Id/Media', upload.single('image'), MediaRoutes.addMediaCategory);
router.delete('/delete/:Project_Id/media/:Category_Id', MediaRoutes.deleteMediaCategory);

module.exports = router;
