const express = require('express');
const router = express.Router();

const boardSensorRoutes = require('../../modules/Board/routes/frontend/boardSensorRoutes');
const boardRoutes = require('../../modules/Board/routes/frontend/boardRoutes');

router.use('/boardsRoutes', boardRoutes);
router.use('/boardSensorRoutes', boardSensorRoutes);

module.exports = router;
