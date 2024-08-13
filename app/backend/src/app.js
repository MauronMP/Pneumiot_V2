const express = require('express');
const app = express();
const unitRoutes = require('./routes/unitRoutes');
const sensorRoutes = require('./routes/sensorRoutes');
const boardRoutes = require('./routes/boardRoutes');
const boardSensorRoutes = require('./routes/boardSensorRoutes');
const patientRoutes = require('./routes/patientRoutes');
const measurementRoutes = require('./routes/measurementRoutes');
const sensorLogRoutes = require('./routes/sensorLogRoutes');
const permissionRoutes = require('./routes/permissionRoutes');
const workerRoleRoutes = require('./routes/workerRoleRoutes');
const rolePermissionRoutes = require('./routes/rolePermissionRoutes');
const workerRoutes = require('./routes/workerRoutes');
const workerAuthRoutes = require('./routes/workerAuthRoutes');
const workerLogRoutes = require('./routes/workerLogRoutes');
const doctorRoutes = require('./routes/doctorRoutes');  // Nueva ruta
const indexRateRoutes = require('./routes/indexRateRoutes');  // Nueva ruta
const hourlyAverageRoutes = require('./routes/hourlyAverageRoutes');  // Nueva ruta
const dailyAverageRoutes = require('./routes/dailyAverageRoutes');  // Nueva ruta
const monthlyAverageRoutes = require('./routes/monthlyAverageRoutes');  // Nueva ruta
const errorLogRoutes = require('./routes/errorLogRoutes');  // Nueva ruta
const sequelize = require('./config/db');

// Middleware para parsear JSON
app.use(express.json());

// Conectar las rutas
app.use('/api/units', unitRoutes);
app.use('/api/sensors', sensorRoutes);
app.use('/api/boards', boardRoutes);
app.use('/api/board-sensors', boardSensorRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/measurements', measurementRoutes);
app.use('/api/sensor-logs', sensorLogRoutes);
app.use('/api/permissions', permissionRoutes);
app.use('/api/worker-roles', workerRoleRoutes);
app.use('/api/role-permissions', rolePermissionRoutes);
app.use('/api/workers', workerRoutes);
app.use('/api/worker-auths', workerAuthRoutes);
app.use('/api/worker-logs', workerLogRoutes);
app.use('/api/doctors', doctorRoutes);  // Nueva ruta
app.use('/api/index-rates', indexRateRoutes);  // Nueva ruta
app.use('/api/hourly-averages', hourlyAverageRoutes);  // Nueva ruta
app.use('/api/daily-averages', dailyAverageRoutes);  // Nueva ruta
app.use('/api/monthly-averages', monthlyAverageRoutes);  // Nueva ruta
app.use('/api/error-logs', errorLogRoutes);  // Nueva ruta

// Manejo de errores
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Something broke!');
});

module.exports = app;
