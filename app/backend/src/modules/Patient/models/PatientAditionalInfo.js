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
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  fecha_nacimiento: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  genero: {
    type: DataTypes.STRING(10),
    allowNull: false,
    validate: {
      isIn: [['M', 'F', 'Otro']],
    },
  },
  telefono: {
    type: DataTypes.STRING(20),
  },
  direccion: {
    type: DataTypes.STRING(150),
  },
  alergias: {
    type: DataTypes.TEXT,
  },
  condiciones_medicas: {
    type: DataTypes.TEXT,
  },
  grupo_sanguineo: {
    type: DataTypes.STRING(5),
  },
  contacto_emergencia: {
    type: DataTypes.STRING(100),
  },
  telefono_emergencia: {
    type: DataTypes.STRING(20),
  },
  fecha_registro: {
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
