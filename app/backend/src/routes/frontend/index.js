const express = require('express');
const router = express.Router();

const unitRoutes = require('../../modules/Unit/routes/frontend/unitRoutes');
const sensorRoutes = require('../../modules/Sensor/routes/frontend/sensorRoutes');
const boardRoutes = require('../../modules/Board/routes/frontend/boardRoutes');
const boardSensorRoutes = require('../../modules/Board/routes/frontend/boardSensorRoutes');
const patientRoutes = require('../../modules/Patient/routes/frontend/patientRoutes.js');
const patientInfoRoutes = require('../../modules/Patient/routes/frontend/patientAditionalInfo.js');
const measurementRoutes = require('../../modules/Measurements/routes/frontend/measurementRoutes');
const sensorLogRoutes = require('../../modules/Sensor/routes/frontend/sensorLogRoutes');
const permissionRoutes = require('../../modules/Permission/routes/frontend/permissionRoutes');
const workerRoleRoutes = require('../../modules/Worker/routes/frontend/workerRoleRoutes');
const rolePermissionRoutes = require('../../modules/Permission/routes/frontend/rolePermissionRoutes');
const workerRoutes = require('../../modules/Worker/routes/frontend/workerRoutes');
const workerAuthRoutes = require('../../modules/Worker/routes/frontend/workerAuthRoutes');
const workerLogRoutes = require('../../modules/Worker/routes/frontend/workerLogRoutes');
const doctorRoutes = require('../../modules/Doctor/routes/frontend/doctorRoutes');
const indexRateRoutes = require('../../modules/IndexRate/routes/frontend/indexRateRoutes');
const hourlyAverageRoutes = require('../../modules/Average/routes/frontend/hourlyAverageRoutes');
const dailyAverageRoutes = require('../../modules/Average/routes/frontend/dailyAverageRoutes');
const monthlyAverageRoutes = require('../../modules/Average/routes/frontend/monthlyAverageRoutes');
const LogRoutes = require('../../modules/Log/routes/frontend/LogRoutes');

// Define routes
router.use('/units', unitRoutes);
router.use('/sensors', sensorRoutes);
router.use('/boards', boardRoutes);
router.use('/board-sensors', boardSensorRoutes);
router.use('/patients', patientRoutes);
router.use('/patientsInfo', patientInfoRoutes);
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
router.use('/logs', LogRoutes);

module.exports = router;