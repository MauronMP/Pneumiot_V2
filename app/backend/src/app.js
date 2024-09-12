const express = require('express');
const cors = require('cors');  // Importa el módulo cors
const app = express();
const apiRoutes = require('./routes/api');
const frontendRoutes = require('./routes/frontend/index');
const authRoutes = require('./routes/frontend/auth');

// Middleware para parsear JSON
app.use(express.json());

// Configura CORS para permitir solicitudes desde cualquier origen
app.use(cors());

// Conectar las rutas
app.use('/api/v1', apiRoutes); // Rutas para la API directa
app.use('/api/frontend', frontendRoutes); // Rutas para la API del frontend
app.use('/api/login', authRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = app;
