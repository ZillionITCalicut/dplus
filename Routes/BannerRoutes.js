// routes/staffRoutes.js
const express = require('express');
const WebsiteController = require('../Controller/BannerController');
const multer = require('multer');
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Banner_Photo'); // Set your destination folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });
router.post('/add-banner', upload.single('banner'), WebsiteController.addWebsiteBanner);
router.get('/Banners/:_id', WebsiteController.getAllWebsiteBanners);
router.delete('/DeleteBanner/:_id', WebsiteController.deleteWebsiteBanners);

module.exports = router;
