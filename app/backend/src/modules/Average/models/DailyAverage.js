// src/models/DailyAverage.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');

const DailyAverage = sequelize.define('DailyAverage', {
  daily_average_id: {
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
  daily_day: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  month_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'daily_average',
  schema: 'pneumiot',
  timestamps: false,
});

module.exports = DailyAverage;
