const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Patient = sequelize.define('Patient', {
  patient_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  patient_dni: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  board_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Board',
      key: 'board_id',
    },
  },
  discharge_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  admission_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'patient',
  schema: 'pneumiot',
  timestamps: false,
});

module.exports = Patient;
