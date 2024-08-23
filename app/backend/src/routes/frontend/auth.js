const express = require('express');
const router = express.Router();

const authRoutes = require('../../modules/Login/routes/authRoutes');
// Define routes
router.use('/', authRoutes);

module.exports = router;