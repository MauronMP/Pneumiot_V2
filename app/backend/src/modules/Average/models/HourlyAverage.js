// src/models/HourlyAverage.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');
const Patient = require('../../Patient/models/Patient');
const Board = require('../../Board/models/Board');
const Sensor = require('../../Sensor/models/Sensor');
const IndexRate = require('../../IndexRate/models/IndexRate');

const HourlyAverage = sequelize.define('HourlyAverage', {
  hourly_average_id: {
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
  average_measure: {
    type: DataTypes.DECIMAL(4, 2),
    allowNull: false,
  },
  index_rate_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'IndexRate',
      key: 'index_rate_id',
    },
  },
  hour_time: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  day_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
}, {
  tableName: 'hourly_average',
  schema: 'pneumiot',
  timestamps: false,
});

// Definir relaciones
HourlyAverage.belongsTo(Patient, { foreignKey: 'patient_id' });
HourlyAverage.belongsTo(Board, { foreignKey: 'board_id' });
HourlyAverage.belongsTo(Sensor, { foreignKey: 'sensor_id' });
HourlyAverage.belongsTo(IndexRate, { foreignKey: 'index_rate_id' });

module.exports = HourlyAverage;
