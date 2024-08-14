// src/models/MonthlyAverage.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');

const MonthlyAverage = sequelize.define('MonthlyAverage', {
  monthly_average_id: {
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
  month_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  year_date: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'monthly_average',
  schema: 'pneumiot',
  timestamps: false,
});

module.exports = MonthlyAverage;
