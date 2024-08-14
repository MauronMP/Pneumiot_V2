const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');

const WorkerLog = sequelize.define('WorkerLog', {
  log_id: {
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
  log_message: {
    type: DataTypes.STRING(264),
    allowNull: false,
  },
}, {
  tableName: 'worker_log',
  schema: 'pneumiot',
  timestamps: false,
});

module.exports = WorkerLog;
