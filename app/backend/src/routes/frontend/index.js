const express = require('express');
const router = express.Router();

const boardSensorRoutes = require('../../modules/Board/routes/frontend/boardSensorRoutes');
const boardRoutes = require('../../modules/Board/routes/frontend/boardRoutes');
const unitRoutes = require('../../modules/Unit/routes/frontend/unitRoutes');

router.use('/boardsRoutes', boardRoutes);
router.use('/boardSensorRoutes', boardSensorRoutes);
router.use('/unitRoutes', unitRoutes);

module.exports = router;
