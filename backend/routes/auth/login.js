const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const validateLogin = require('../../validations/auth/login');
const loginController = require('../../controllers/auth/login');
const handleValidationErrors = require('../../middlewares/handleValidationErrors');
const { successResponse, errorResponse } = require('../../utils/responseformat');

router.use(handleValidationErrors);

router.post('/login', validateLogin, async (req, res) => {
    try {
        const user = await loginController(req);
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.json(successResponse('Login successful', { token, user }));
    } catch (error) {
        if (error.message === 'Invalid credentials') {
            return res.status(401).json(errorResponse('Invalid credentials', 401));
        }
        console.error('Route login error:', error);
        res.status(500).json(errorResponse('Server error', 500));
    }
});

module.exports = router;