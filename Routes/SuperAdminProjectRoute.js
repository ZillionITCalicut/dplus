const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Project_Category_Thumbnail');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});


const upload = multer({ storage });

const SuperAdminProjectRoute = require('../Controller/SuperAdminProjectController');

// Existing routes...
router.post('/Register-Project-SuperAdmin', SuperAdminProjectRoute.registerProject);
router.post('/login-Project-SuperAdmin', SuperAdminProjectRoute.loginProject);
router.get('/ViewAll/Projects-SuperAdmin', SuperAdminProjectRoute.getallProjects);
router.delete('/Projects-SuperAdmin/:_id', SuperAdminProjectRoute.deleteProperty);
router.get('/project/view/:_id', SuperAdminProjectRoute.viewProject);

// New route for creating a project category
router.post('/AddProjectCategory/:project_Id', SuperAdminProjectRoute.addProjectCategory);
router.delete('/projects/delete/:projectId/projectCategory/:categoryId', SuperAdminProjectRoute.deleteProjectCategory);

router.post('/Projects/:Project_Id/projects', SuperAdminProjectRoute.addAmenityDetail);
router.post('/Projects/:Project_Id/ProjectCategory/:Category_Id/thumbnail', upload.single('projectCategoryThumbnail'), SuperAdminProjectRoute.addProjectCategoryThumbnail);

router.get('/projects/all', SuperAdminProjectRoute.getAllProjects1);

module.exports = router;
