const express = require('express');
const MettaRoutes = require('../Controller/MettaController');

const router = express.Router();


router.post('/AddMetta/Project/:project_Id', MettaRoutes.addMettaDetails);
router.post('/AddMetta/Individual/Project/:id/:Category_Id/:project', MettaRoutes.addProjectMetta);
/* router.get('/ViewAll/Careers', CareerController.getallCareers);

router.delete('/Career/delete/:careersId', CareerController.deleteCareers); */
/*
router.post('/Enquiry/update/:enquiryId', EnquiryController.updateEnquiryStatus);
 */
module.exports = router;
