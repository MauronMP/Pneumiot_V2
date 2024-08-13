const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Worker = sequelize.define('Worker', {
  worker_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  worker_dni: {
    type: DataTypes.STRING(64),
    unique: true,
    allowNull: false,
  },
  worker_email: {
    type: DataTypes.STRING(64),
    allowNull: false,
  },
  worker_name: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  worker_surname: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  worker_role_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'WorkerRole',
      key: 'worker_role_id',
    },
  },
}, {
  tableName: 'worker',
  schema: 'pneumiot',
  timestamps: false,
});

module.exports = Worker;
