const DailyAverage = require('../models/DailyAverage');
const Sensor = require('../../Sensor/models/Sensor');
const { Op } = require('sequelize'); // Asegúrate de importar Op
const getDailyAverages = async (patientId, boardId, sensorId, startDate, endDate) => {
    try {
        const results = await DailyAverage.findAll({
            where: {
                patient_id: patientId,
                board_id: boardId,
                sensor_id: sensorId,
                day_date: {
                    [Op.between]: [startDate, endDate],  // Filtrar por rango de fechas
                },
            },
            include: [{
                model: Sensor,
                attributes: ['sensor_type'],  // Obtenemos sensor_type desde la tabla sensor
            }],
            attributes: ['sensor_id', 'average_measure', 'index_rate_id', 'day_date'],  // Atributos a devolver de daily_average
            order: [
                ['day_date', 'ASC'],  // Ordenar por fecha
            ],
        });

        // Mapeo para devolver los resultados en el formato deseado
        return results.map(result => ({
            sensor_type: result.Sensor.sensor_type,  // sensor_type primero
            sensor_id: result.sensor_id,            // Luego sensor_id
            average_measure: result.average_measure, // Luego average_measure
            index_rate_id: result.index_rate_id,    // Luego index_rate_id
            day_date: result.day_date,              // Finalmente day_date
        }));
    } catch (error) {
        throw new Error(`Error fetching daily averages: ${error.message}`);
    }
};

const getAllDailyAverages = async () => {
    return await DailyAverage.findAll();
};

const getDailyAverageById = async (id) => {
    return await DailyAverage.findByPk(id);
};

const createDailyAverage = async (patient_id, board_id, sensor_id, average_measure, index_rate_id, daily_day, month_id) => {
    return await DailyAverage.create({
        patient_id,
        board_id,
        sensor_id,
        average_measure,
        index_rate_id,
        daily_day,
        month_id
    });
};

const updateDailyAverage = async (id, patient_id, board_id, sensor_id, average_measure, index_rate_id, daily_day, month_id) => {
    const dailyAverage = await DailyAverage.findByPk(id);
    if (dailyAverage) {
        dailyAverage.patient_id = patient_id;
        dailyAverage.board_id = board_id;
        dailyAverage.sensor_id = sensor_id;
        dailyAverage.average_measure = average_measure;
        dailyAverage.index_rate_id = index_rate_id;
        dailyAverage.daily_day = daily_day;
        dailyAverage.month_id = month_id;
        await dailyAverage.save();
        return dailyAverage;
    }
    return null;
};

const deleteDailyAverage = async (id) => {
    const dailyAverage = await DailyAverage.findByPk(id);
    if (dailyAverage) {
        await dailyAverage.destroy();
        return true;
    }
    return false;
};

module.exports = {
    getDailyAverages,
    getAllDailyAverages,
    getDailyAverageById,
    createDailyAverage,
    updateDailyAverage,
    deleteDailyAverage
};
