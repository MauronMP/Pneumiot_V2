const hourlyAverageService = require('../services/hourlyAverageService');

const getHourlyAverages = async (req, res) => {
    const { patientId, boardId, sensorId, dayDate } = req.query; // Asegúrate de que estás extrayendo los parámetros de la consulta

    try {
        const averages = await hourlyAverageService.getHourlyAverages(patientId, boardId, sensorId, dayDate);
        res.status(200).json(averages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getAllHourlyAverages = async (req, res) => {
    try {
        const hourlyAverages = await hourlyAverageService.getAllHourlyAverages();
        res.status(200).json(hourlyAverages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getHourlyAverageById = async (req, res) => {
    try {
        const { id } = req.params;
        const hourlyAverage = await hourlyAverageService.getHourlyAverageById(id);
        if (hourlyAverage) {
            res.status(200).json(hourlyAverage);
        } else {
            res.status(404).json({ message: "Hourly Average not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createHourlyAverage = async (req, res) => {
    try {
        const { patient_id, board_id, sensor_id, average_measure, index_rate_id, hour_time, day_date } = req.body;
        const newHourlyAverage = await hourlyAverageService.createHourlyAverage(patient_id, board_id, sensor_id, average_measure, index_rate_id, hour_time, day_date);
        res.status(201).json(newHourlyAverage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateHourlyAverage = async (req, res) => {
    try {
        const { id } = req.params;
        const { patient_id, board_id, sensor_id, average_measure, index_rate_id, hour_time, day_date } = req.body;
        const updatedHourlyAverage = await hourlyAverageService.updateHourlyAverage(id, patient_id, board_id, sensor_id, average_measure, index_rate_id, hour_time, day_date);
        if (updatedHourlyAverage) {
            res.status(200).json(updatedHourlyAverage);
        } else {
            res.status(404).json({ message: "Hourly Average not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteHourlyAverage = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await hourlyAverageService.deleteHourlyAverage(id);
        if (result) {
            res.status(200).json({ message: "Hourly Average deleted successfully" });
        } else {
            res.status(404).json({ message: "Hourly Average not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getHourlyAverages,
    getAllHourlyAverages,
    getHourlyAverageById,
    createHourlyAverage,
    updateHourlyAverage,
    deleteHourlyAverage
};
