const express = require('express');
const app = express();
const apiRoutes = require('./routes/api');
const frontendRoutes = require('./routes/frontend');
const sequelize = require('./config/db');

// Middleware para parsear JSON
app.use(express.json());

// Conectar las rutas
app.use('/api/v1', apiRoutes); // Rutas para la API directa
app.use('/api/frontend', frontendRoutes); // Rutas para la API del frontend

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = app;
