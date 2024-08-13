const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const BoardSensor = sequelize.define('BoardSensor', {
  board_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  sensor_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
}, {
  tableName: 'board_sensor',
  schema: 'pneumiot',
  timestamps: false,
});

module.exports = BoardSensor;
