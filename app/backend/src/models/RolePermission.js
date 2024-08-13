const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const RolePermission = sequelize.define('RolePermission', {
  role_permission_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  worker_role_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'WorkerRole',
      key: 'worker_role_id',
    },
  },
  permission_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Permission',
      key: 'permission_id',
    },
  },
}, {
  tableName: 'role_permissions',
  schema: 'pneumiot',
  timestamps: false,
});

module.exports = RolePermission;
