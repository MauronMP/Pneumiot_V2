// src/models/IndexRate.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const IndexRate = sequelize.define('IndexRate', {
  index_rate_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  rate: {
    type: DataTypes.STRING(32),
    allowNull: false,
  },
  rate_description: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
}, {
  tableName: 'index_rate',
  schema: 'pneumiot',
  timestamps: false,
});

module.exports = IndexRate;
