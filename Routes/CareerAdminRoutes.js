const express = require('express');
const CareerAdminController = require('../Controller/CareerAdminController');

const router = express.Router();


router.post('/AddCareerItem/:project_Id', CareerAdminController.addCareerItem);

router.delete('/AdminCareer/:project_Id/delete/:careerItemId', CareerAdminController.deleteCareerItem);

router.post('/projects/:project_Id/editcareer/:careerItemId', CareerAdminController.updateCareerItem);


module.exports = router;
