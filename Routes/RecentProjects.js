const express = require('express');
const recentProjects = require('../Controller/RecentProjects');
const router = express.Router();

router.post('/recentProjects/:Project_Id', recentProjects.addRecenProjects);

module.exports = router;
