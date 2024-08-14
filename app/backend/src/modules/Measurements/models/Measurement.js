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
  },
  board_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Board',
      key: 'board_id',
    },
  },
  sensor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Sensor',
      key: 'sensor_id',
    },
  },
  sensor_value: {
    type: DataTypes.DECIMAL(4, 2),
    allowNull: false,
  },
  log_time_utc: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  log_time_local: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'measurements',
  schema: 'pneumiot',
  timestamps: false,
});

module.exports = Measurement;
