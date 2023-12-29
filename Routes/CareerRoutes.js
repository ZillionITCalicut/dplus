const express = require('express');
const CareerController = require('../Controller/CareerController');

const router = express.Router();


const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Career_Resume');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

router.post('/AddCareer', upload.single('resume'), CareerController.registerCareers);
router.get('/ViewAll/Careers', CareerController.getallCareers);

router.delete('/Career/delete/:careersId', CareerController.deleteCareers);
/*
router.post('/Enquiry/update/:enquiryId', EnquiryController.updateEnquiryStatus);
 */
module.exports = router;
