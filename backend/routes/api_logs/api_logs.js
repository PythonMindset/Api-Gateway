const express = require('express');
const router = express.Router();

const authenticateToken = require('../../middlewares/authenticateToken');
const handleValidationErrors = require('../../middlewares/handleValidationErrors');
const apiLogger = require('../../middlewares/apiLogger');
const { requireAdmin } = require('../../middlewares/rbac');
const { successResponse, errorResponse } = require('../../utils/responseformat');
const validateGetApiLogs = require('../../validations/api_logs/getApiLogs');
const getApiLogs = require('../../controllers/api_logs/getApiLogs');

router.use(authenticateToken);
router.use(requireAdmin);
router.use(apiLogger);
router.use(handleValidationErrors);

router.get('/', validateGetApiLogs, async (req, res) => {
    try {
        const result = await getApiLogs(req);
        res.json(successResponse('API logs retrieved successfully', result));
    } catch (error) {
        console.error('Route get API logs error:', error);
        res.status(500).json(errorResponse('Server error', 500));
    }
});

module.exports = router;