// routes/staffRoutes.js
const express = require('express');
const MemberController = require('../Controller/MemberList');
const multer = require('multer');
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Member_List'); // Set your destination folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

router.post('/Project/:Project_Id/AddMember', upload.single('memberFile'), MemberController.addmember);
router.delete('/delete/:Project_Id/Member/:Member_Id', MemberController.deleteMember);

module.exports = router;
