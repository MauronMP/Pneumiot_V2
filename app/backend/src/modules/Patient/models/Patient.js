const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');
const Board = require('../../Board/models/Board');
const Sensor = require('../../Sensor/models/Sensor');
const BoardSensor = require('../../Board/models/BoardSensor');

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
      model: Board,
      key: 'board_id',
    },
  },
  discharge_date: {
    type: DataTypes.DATE,
    allowNull: true,
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

Patient.belongsTo(Board, { foreignKey: 'board_id' });
Board.hasMany(Patient, { foreignKey: 'board_id' });

// Relación con BoardSensor (para llegar a los sensores)
Patient.belongsToMany(Sensor, {
  through: BoardSensor,
  foreignKey: 'board_id',
  otherKey: 'sensor_id',
});


module.exports = Patient;
