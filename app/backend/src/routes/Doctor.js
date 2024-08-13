// src/models/Doctor.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Doctor = sequelize.define('Doctor', {
  doctor_patient_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  patient_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Patient',
      key: 'patient_id',
    },
  },
  worker_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Worker',
      key: 'worker_id',
    },
  },
}, {
  tableName: 'doctor',
  schema: 'pneumiot',
  timestamps: false,
});

module.exports = Doctor;
