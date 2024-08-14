const BoardSensor = require('../models/BoardSensor');

class BoardSensorService {
    // Obtener todos los registros de BoardSensor
    async getAllBoardSensors() {
        try {
            const boardSensors = await BoardSensor.findAll();
            return boardSensors;
        } catch (error) {
            throw new Error('Error fetching BoardSensors: ' + error.message);
        }
    }

    // Obtener un BoardSensor por board_id y sensor_id
    async getBoardSensorById(board_id, sensor_id) {
        try {
            const boardSensor = await BoardSensor.findOne({
                where: { board_id, sensor_id }
            });
            if (!boardSensor) {
                throw new Error('BoardSensor not found');
            }
            return boardSensor;
        } catch (error) {
            throw new Error('Error fetching BoardSensor: ' + error.message);
        }
    }

    // Crear un nuevo BoardSensor
    async createBoardSensor(data) {
        try {
            const newBoardSensor = await BoardSensor.create(data);
            return newBoardSensor;
        } catch (error) {
            throw new Error('Error creating BoardSensor: ' + error.message);
        }
    }

    // Actualizar un BoardSensor existente
    async updateBoardSensor(board_id, sensor_id, data) {
        try {
            const [updated] = await BoardSensor.update(data, {
                where: { board_id, sensor_id }
            });
            if (updated === 0) {
                throw new Error('BoardSensor not found');
            }
            return 'BoardSensor updated successfully';
        } catch (error) {
            throw new Error('Error updating BoardSensor: ' + error.message);
        }
    }

    // Eliminar un BoardSensor
    async deleteBoardSensor(board_id, sensor_id) {
        try {
            const deleted = await BoardSensor.destroy({
                where: { board_id, sensor_id }
            });
            if (deleted === 0) {
                throw new Error('BoardSensor not found');
            }
            return 'BoardSensor deleted successfully';
        } catch (error) {
            throw new Error('Error deleting BoardSensor: ' + error.message);
        }
    }
}

module.exports = new BoardSensorService();
