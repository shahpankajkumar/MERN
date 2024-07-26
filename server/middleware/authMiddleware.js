const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = {
    verifyToken: (req, res, next) => {
        const authHeader = req.header('Authorization');
        if (!authHeader) return res.status(401).send('Access denied.');
        if (!token) return res.status(401).send('Access denied.');

        const token = authHeader.split(' ')[1];
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (err) {
            res.status(400).send('Invalid token.');
        }
    },

    isManager: async (req, res, next) => {
        const { id } = req.body;
        console.log("id:>>>>> ", id);
        try {
            const user = await User.findById(id);
            if (user.role !== 'manager') {
                return res.status(403).send('Access denied.');
            }
            next();
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
};

module.exports = authMiddleware;

