const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Permission = sequelize.define('Permission', {
  permission_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  permission_name: {
    type: DataTypes.STRING(64),
    unique: true,
    allowNull: false,
  },
  permission_description: {
    type: DataTypes.STRING(128),
  },
}, {
  tableName: 'permissions',
  schema: 'pneumiot',
  timestamps: false,
});

module.exports = Permission;
