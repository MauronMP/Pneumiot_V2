const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');

const SensorLog = sequelize.define('SensorLog', {
  log_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
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
  log_message: {
    type: DataTypes.STRING(264),
  },
}, {
  tableName: 'sensor_log',
  schema: 'pneumiot',
  timestamps: false,
});

module.exports = SensorLog;
