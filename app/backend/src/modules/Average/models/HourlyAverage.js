// src/models/HourlyAverage.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');

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
    type: DataTypes.NUMERIC(4, 2),
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
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'hourly_average',
  schema: 'pneumiot',
  timestamps: false,
});

module.exports = HourlyAverage;
