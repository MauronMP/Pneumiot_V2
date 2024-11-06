const MonthlyAverage = require('../models/MonthlyAverage');
const Sensor = require('../../Sensor/models/Sensor');
const { Op } = require('sequelize'); // Asegúrate de importar Op

const getMonthlyAveragesWithConditions = async (patientId, boardId, sensorId, yearNumber) => {
    try {
      const results = await MonthlyAverage.findAll({
        where: {
          patient_id: patientId, // Filtro por patientId
          board_id: boardId,     // Filtro por boardId
          sensor_id: sensorId,   // Filtro por sensorId
          year_date: yearNumber
        },
        include: [{
          model: Sensor, // Relación con el modelo Sensor
          attributes: ['sensor_type'],
        }],
        attributes: ['average_measure', 'index_rate_id', 'month_number', 'year_date'],
      });
  
      // Mapeamos los resultados para devolver en el formato deseado
      return results.map(result => ({
        sensor_type: result.Sensor.sensor_type,
        sensor_id: result.sensor_id,
        average_measure: result.average_measure,
        index_rate_id: result.index_rate_id,
        month_number: result.month_number,
        year_date: result.year_date,
      }));
    } catch (error) {
      throw new Error(`Error fetching monthly averages: ${error.message}`);
    }
  };
  
const getAllMonthlyAverages = async () => {
    return await MonthlyAverage.findAll();
};

const getMonthlyAverageById = async (id) => {
    return await MonthlyAverage.findByPk(id);
};

const createMonthlyAverage = async (patient_id, board_id, sensor_id, average_measure, index_rate_id, month_number, year_date) => {
    return await MonthlyAverage.create({
        patient_id,
        board_id,
        sensor_id,
        average_measure,
        index_rate_id,
        month_number,
        year_date
    });
};

const updateMonthlyAverage = async (id, patient_id, board_id, sensor_id, average_measure, index_rate_id, month_number, year_date) => {
    const monthlyAverage = await MonthlyAverage.findByPk(id);
    if (monthlyAverage) {
        monthlyAverage.patient_id = patient_id;
        monthlyAverage.board_id = board_id;
        monthlyAverage.sensor_id = sensor_id;
        monthlyAverage.average_measure = average_measure;
        monthlyAverage.index_rate_id = index_rate_id;
        monthlyAverage.month_number = month_number;
        monthlyAverage.year_date = year_date;
        await monthlyAverage.save();
        return monthlyAverage;
    }
    return null;
};

const deleteMonthlyAverage = async (id) => {
    const monthlyAverage = await MonthlyAverage.findByPk(id);
    if (monthlyAverage) {
        await monthlyAverage.destroy();
        return true;
    }
    return false;
};

module.exports = {
    getMonthlyAveragesWithConditions,
    getAllMonthlyAverages,
    getMonthlyAverageById,
    createMonthlyAverage,
    updateMonthlyAverage,
    deleteMonthlyAverage
};
