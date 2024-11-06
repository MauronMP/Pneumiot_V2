// src/models/DailyAverage.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');
const Patient = require('../../Patient/models/Patient');
const Board = require('../../Board/models/Board');
const Sensor = require('../../Sensor/models/Sensor');
const IndexRate = require('../../IndexRate/models/IndexRate');

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
  daily_day: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  month_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  day_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
}, {
  tableName: 'daily_average',
  schema: 'pneumiot',
  timestamps: false,
});

// Definir relaciones
DailyAverage.belongsTo(Patient, { foreignKey: 'patient_id' });
DailyAverage.belongsTo(Board, { foreignKey: 'board_id' });
DailyAverage.belongsTo(Sensor, { foreignKey: 'sensor_id' });
DailyAverage.belongsTo(IndexRate, { foreignKey: 'index_rate_id' });

module.exports = DailyAverage;
