// src/models/Unit.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');

const Unit = sequelize.define('Unit', {
  unit_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  unit_abbreviation: {
    type: DataTypes.CHAR(8),
    allowNull: false,
  },
  unit_description: {
    type: DataTypes.STRING(64),
  },
}, {
  tableName: 'units',
  schema: 'pneumiot',
  timestamps: false,
});

module.exports = Unit;
