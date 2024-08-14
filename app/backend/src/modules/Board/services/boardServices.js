// src/modules/board/services/boardService.js
const Board = require('../models/Board');

class BoardService {
    async getAllBoards() {
        try {
            return await Board.findAll();
        } catch (error) {
            throw new Error('Error retrieving boards: ' + error.message);
        }
    }

    async getBoardById(id) {
        try {
            const board = await Board.findByPk(id);
            if (!board) {
                throw new Error('Board not found');
            }
            return board;
        } catch (error) {
            throw new Error('Error retrieving board: ' + error.message);
        }
    }

    async createBoard(boardData) {
        try {
            return await Board.create(boardData);
        } catch (error) {
            throw new Error('Error creating board: ' + error.message);
        }
    }

    async updateBoard(id, boardData) {
        try {
            const [updatedRows] = await Board.update(boardData, {
                where: { board_id: id }
            });
            if (updatedRows === 0) {
                throw new Error('Board not found');
            }
            return 'Board updated successfully';
        } catch (error) {
            throw new Error('Error updating board: ' + error.message);
        }
    }

    async deleteBoard(id) {
        try {
            const deletedRows = await Board.destroy({
                where: { board_id: id }
            });
            if (deletedRows === 0) {
                throw new Error('Board not found');
            }
            return 'Board deleted successfully';
        } catch (error) {
            throw new Error('Error deleting board: ' + error.message);
        }
    }
}

module.exports = new BoardService();
