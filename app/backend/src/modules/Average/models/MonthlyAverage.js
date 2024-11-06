// src/models/MonthlyAverage.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');// models/MonthlyAverage.js
const Patient = require('../../Patient/models/Patient');
const Board = require('../../Board/models/Board');
const Sensor = require('../../Sensor/models/Sensor');
const IndexRate = require('../../IndexRate/models/IndexRate');

const MonthlyAverage = sequelize.define('MonthlyAverage', {
  monthly_average_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  patient_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  board_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  sensor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  average_measure: {
    type: DataTypes.DECIMAL(4, 2),
    allowNull: false,
  },
  index_rate_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
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

MonthlyAverage.belongsTo(Patient, { foreignKey: 'patient_id', onDelete: 'CASCADE' });
MonthlyAverage.belongsTo(Board, { foreignKey: 'board_id', onDelete: 'CASCADE' });
MonthlyAverage.belongsTo(Sensor, { foreignKey: 'sensor_id', onDelete: 'CASCADE' });
MonthlyAverage.belongsTo(IndexRate, { foreignKey: 'index_rate_id', onDelete: 'RESTRICT' });

module.exports = MonthlyAverage;
