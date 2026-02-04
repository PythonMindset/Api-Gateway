const express = require('express');
const router = express.Router();

const validateAccessRequest = require('../../validations/auth/accessRequest');
const accessRequestController = require('../../controllers/auth/accessRequest');
const handleValidationErrors = require('../../middlewares/handleValidationErrors');
const { successResponse, errorResponse } = require('../../utils/responseformat');

router.use(handleValidationErrors);

router.post('/access-request', validateAccessRequest, async (req, res) => {
    try {
        const result = await accessRequestController(req);

        res.json(successResponse('Access request processed successfully. Check your email for login credentials.', {
            user: { id: result.id, email: result.email, role: result.role }
        }));
    } catch (error) {
        if (error.message === 'User already exists') {
            return res.status(409).json(errorResponse('User already exists', 409));
        }
        if (error.message === 'Failed to send welcome email. Account creation cancelled.') {
            return res.status(500).json(errorResponse('Failed to send welcome email. Please try again later.', 500));
        }
        console.error('Access request error:', error);
        res.status(500).json(errorResponse('Server error', 500));
    }
});

module.exports = router;