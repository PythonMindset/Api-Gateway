const express = require('express');
const router = express.Router();

const validateChangePassword = require('../../validations/user/changePassword');
const changePasswordController = require('../../controllers/user/changePassword');
const handleValidationErrors = require('../../middlewares/handleValidationErrors');
const authenticateToken = require('../../middlewares/authenticateToken');
const { successResponse, errorResponse } = require('../../utils/responseformat');

router.use(authenticateToken,handleValidationErrors);

router.put('/change-password', validateChangePassword, async (req, res) => {
    try {
        const result = await changePasswordController(req);
        res.json(successResponse(result.message));
    } catch (error) {
        if (error.message === 'Access denied: Cannot change another user\'s password') {
            return res.status(403).json(errorResponse('Access denied: Cannot change another user\'s password', 403));
        }
        if (error.message === 'Current password is incorrect') {
            return res.status(400).json(errorResponse('Current password is incorrect', 400));
        }
        if (error.message === 'User not found') {
            return res.status(404).json(errorResponse('User not found', 404));
        }
        console.error('Route change password error:', error);
        res.status(500).json(errorResponse('Server error', 500));
    }
});

module.exports = router;