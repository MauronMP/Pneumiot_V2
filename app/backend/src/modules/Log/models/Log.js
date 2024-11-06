// src/models/Log.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');

const Log = sequelize.define('Log', {
  log_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  log_message: {
    type: DataTypes.STRING(264),
    allowNull: true,
  },
}, {
  tableName: 'error_log',
  schema: 'pneumiot',
  timestamps: false,
});

module.exports = Log;
