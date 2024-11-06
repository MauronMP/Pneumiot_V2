// src/models/Sensor.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');
const Unit = require('../../Unit/models/Unit');

const Sensor = sequelize.define('Sensor', {
  sensor_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  sensor_code: {
    type: DataTypes.STRING(64),
    allowNull: false,
  },
  sensor_type: {
    type: DataTypes.STRING(64),
    allowNull: false,
  },
  unit_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Unit',
      key: 'unit_id',
    },
  },
  min_value: {
    type: DataTypes.DECIMAL(4, 2),
    allowNull: false,
  },
  max_value: {
    type: DataTypes.DECIMAL(4, 2),
    allowNull: false,
  },
}, {
  tableName: 'sensor',
  schema: 'pneumiot',
  timestamps: false,
});

Sensor.belongsTo(Unit, { foreignKey: 'unit_id' });

module.exports = Sensor;
