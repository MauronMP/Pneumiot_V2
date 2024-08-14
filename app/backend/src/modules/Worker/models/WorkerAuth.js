const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');

const WorkerAuth = sequelize.define('WorkerAuth', {
  worker_auth_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  worker_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Worker',
      key: 'worker_id',
    },
  },
  passwd_auth: {
    type: DataTypes.CHAR(128),
    allowNull: false,
  },
}, {
  tableName: 'worker_auth',
  schema: 'pneumiot',
  timestamps: false,
});

module.exports = WorkerAuth;
