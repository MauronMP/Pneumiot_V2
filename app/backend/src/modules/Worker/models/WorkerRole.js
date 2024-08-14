const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');

const WorkerRole = sequelize.define('WorkerRole', {
  worker_role_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  worker_role_name: {
    type: DataTypes.STRING(24),
  },
  worker_role_description: {
    type: DataTypes.STRING(64),
  },
}, {
  tableName: 'worker_role',
  schema: 'pneumiot',
  timestamps: false,
});

module.exports = WorkerRole;
