const express = require('express');
const EnquiryController = require('../Controller/EnquiryController');

const router = express.Router();


router.post('/AddEnquiry', EnquiryController.registerEnquiry);
router.get('/ViewAll/Enquiries', EnquiryController.getallEnquiries);
router.delete('/Enquiry/delete/:enquiryId', EnquiryController.deleteEnquiry);
router.post('/Enquiry/update/:enquiryId', EnquiryController.updateEnquiryStatus);

module.exports = router;
