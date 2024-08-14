const express = require('express');
const router = express.Router();

const unitRoutes = require('../../modules/Unit/routes/api/unitRoutes');
const sensorRoutes = require('../../modules/Sensor/routes/api/sensorRoutes');
const boardRoutes = require('../../modules/Board/routes/api/boardRoutes');
const boardSensorRoutes = require('../../modules/Board/routes/api/api/boardSensorRoutes');
const patientRoutes = require('../../modules/Patient/routes/api/patientRoutes');
const measurementRoutes = require('../../modules/Measurements/routes/api/measurementRoutes');
const sensorLogRoutes = require('../../modules/Sensor/routes/api/sensorLogRoutes');
const permissionRoutes = require('../../modules/Permission/routes/api/permissionRoutes');
const workerRoleRoutes = require('../../modules/Worker/routes/api/workerRoleRoutes');
const rolePermissionRoutes = require('../../modules/Permission/routes/api/rolePermissionRoutes');
const workerRoutes = require('../../modules/Worker/routes/api/workerRoutes');
const workerAuthRoutes = require('../../modules/Worker/routes/api/workerAuthRoutes');
const workerLogRoutes = require('../../modules/Worker/routes/api/workerLogRoutes');
const doctorRoutes = require('../../modules/Doctor/routes/api/doctorRoutes');
const indexRateRoutes = require('../../modules/IndexRate/routes/api/indexRateRoutes');
const hourlyAverageRoutes = require('../../modules/Average/routes/api/hourlyAverageRoutes');
const dailyAverageRoutes = require('../../modules/Average/routes/api/dailyAverageRoutes');
const monthlyAverageRoutes = require('../../modules/Average/routes/api/monthlyAverageRoutes');
const errorLogRoutes = require('../../modules/ErrorLog/routes/api/errorLogRoutes');

// Define routes
router.use('/units', unitRoutes);
router.use('/sensors', sensorRoutes);
router.use('/boards', boardRoutes);
router.use('/board-sensors', boardSensorRoutes);
router.use('/patients', patientRoutes);
router.use('/measurements', measurementRoutes);
router.use('/sensor-logs', sensorLogRoutes);
router.use('/permissions', permissionRoutes);
router.use('/worker-roles', workerRoleRoutes);
router.use('/role-permissions', rolePermissionRoutes);
router.use('/workers', workerRoutes);
router.use('/worker-auths', workerAuthRoutes);
router.use('/worker-logs', workerLogRoutes);
router.use('/doctors', doctorRoutes);
router.use('/index-rates', indexRateRoutes);
router.use('/hourly-averages', hourlyAverageRoutes);
router.use('/daily-averages', dailyAverageRoutes);
router.use('/monthly-averages', monthlyAverageRoutes);
router.use('/error-logs', errorLogRoutes);

module.exports = router;
