const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');
const Board = require('../models/Board');
const Sensor = require('../../Sensor/models/Sensor');

const BoardSensor = sequelize.define('BoardSensor', {
  board_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Board,
      key: 'board_id',
    },
    primaryKey: true,
  },
  sensor_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Sensor,
      key: 'sensor_id',
    },
    primaryKey: true,
  },
}, {
  tableName: 'board_sensor',
  schema: 'pneumiot',
  timestamps: false,
});

Board.belongsToMany(Sensor, { through: BoardSensor, foreignKey: 'board_id' });
Sensor.belongsToMany(Board, { through: BoardSensor, foreignKey: 'sensor_id' });

module.exports = BoardSensor;