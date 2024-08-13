// src/index.js
const app = require('./app');
const sequelize = require('./config/db');

// Sincronizar la base de datos y luego iniciar el servidor
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');
    
    // Sincronizar los modelos con la base de datos (opcional)
    // await sequelize.sync();

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
