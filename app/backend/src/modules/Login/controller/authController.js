// /login/controllers/authController.js
const authService = require('../service/authService');

const login = async (req, res) => {
    try {
        const { emailOrDni, password } = req.body;
        if (!emailOrDni || !password) {
            return res.status(400).json({ message: 'Email/DNI and password are required' });
        }

        const result = await authService.authenticateUser(emailOrDni, password);
        res.status(200).json(result);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

module.exports = {
    login
};
