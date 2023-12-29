const express = require('express');
const AdminController = require('../Controller/AdminController');

const router = express.Router();


router.post('/SuperAdminLogin', AdminController.login);

module.exports = router;
