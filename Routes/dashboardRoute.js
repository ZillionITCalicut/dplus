// routes/dashboardRoute.js

const express = require('express');
const verifyToken = require('../middleware/authMiddleware');
const verifyToken1 = require('../middleware/authMiddleware1');

const router = express.Router();

router.get('/SuperAdminDashboard', verifyToken, (req, res) => {
    // Access the user information from req.user
    const userId = req.user.userId;

    res.json({ message: 'Dashboard Page', userId });
});

router.get('/AdminDashboard', verifyToken1, (req, res) => {
    // Access the user information from req.user
    const userId = req.user.userId;

    res.json({ message: 'Dashboard Page', userId });
});

module.exports = router;
