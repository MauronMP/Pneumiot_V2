const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');

const Board = sequelize.define('Board', {
  board_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  board_code: {
    type: DataTypes.STRING(64),
    allowNull: false,
  },
}, {
  tableName: 'board',
  schema: 'pneumiot',
  timestamps: false,
});

module.exports = Board;
