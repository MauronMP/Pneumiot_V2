const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');

const Measurement = sequelize.define('Measurement', {
  measurement_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  patient_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Patient',
      key: 'patient_id',
    },
    onDelete: 'CASCADE',  // Elimina las mediciones si se elimina el paciente
  },
  board_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Board',
      key: 'board_id',
    },
    onDelete: 'CASCADE',  // Elimina las mediciones si se elimina la board
  },
  sensor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Sensor',
      key: 'sensor_id',
    },
    onDelete: 'RESTRICT',  // No permite eliminar el sensor si hay mediciones asociadas
  },
  sensor_value: {
    type: DataTypes.DECIMAL(4, 2),
    allowNull: false,
  },
  log_time_utc: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal(`CURRENT_TIMESTAMP AT TIME ZONE 'UTC'`), // Valor por defecto en UTC
  },
  log_time_local: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,  // Valor por defecto para la hora local
  },
}, {
  tableName: 'measurements',
  schema: 'pneumiot',
  timestamps: false,  // No utiliza createdAt y updatedAt
});

module.exports = Measurement;
