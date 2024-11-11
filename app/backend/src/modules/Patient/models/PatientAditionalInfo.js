const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');
const Patient = require('../models/Patient');

const PatientAditionalInfo = sequelize.define('PatientAditionalInfo', {
  patient_info_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  patient_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Patient,
      key: 'patient_id',
    },
    onDelete: 'CASCADE',
  },
  patient_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  patient_surname: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  date_birth: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  genre: {
    type: DataTypes.STRING(10),
    allowNull: false,
    validate: {
      isIn: [['M', 'F', 'Otro']],
    },
  },
  telephone_number: {
    type: DataTypes.STRING(20),
  },
  direction: {
    type: DataTypes.STRING(150),
  },
  alergies: {
    type: DataTypes.TEXT,
  },
  medical_condition: {
    type: DataTypes.TEXT,
  },
  blood_type: {
    type: DataTypes.STRING(5),
  },
  emergency_contact: {
    type: DataTypes.STRING(100),
  },
  emergency_phone_number: {
    type: DataTypes.STRING(20),
  },
  admission_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'patient_aditional_info',
  schema: 'pneumiot',
  timestamps: false,
});

// Relación con el modelo Patient
PatientAditionalInfo.belongsTo(Patient, { foreignKey: 'patient_id' });
Patient.hasOne(PatientAditionalInfo, { foreignKey: 'patient_id' });

module.exports = PatientAditionalInfo;
