const express = require('express');
const router = express.Router();

const authenticateToken = require('../../middlewares/authenticateToken');
const handleValidationErrors = require('../../middlewares/handleValidationErrors');
const apiLogger = require('../../middlewares/apiLogger');
const { successResponse, errorResponse } = require('../../utils/responseformat');
const createUserRateLimiter = require('../../middlewares/rateLimiter');
const validateListPublicProjects = require('../../validations/user/listPublicProjects');
const validateGetPublicProjectById = require('../../validations/user/getPublicProjectById');
const listPublicProjects = require('../../controllers/user/listPublicProjects');
const getPublicProjectById = require('../../controllers/user/getPublicProjectById');

router.use(createUserRateLimiter());
router.use(authenticateToken);
router.use(apiLogger);
router.use(handleValidationErrors);

router.get('/public', validateListPublicProjects, async (req, res) => {
    try {
        const projects = await listPublicProjects(req);
        res.json(successResponse('Public projects retrieved successfully', projects));
    } catch (error) {
        console.error('Route list public projects error:', error);
        res.status(500).json(errorResponse('Server error', 500));
    }
});

router.get('/public/:id', validateGetPublicProjectById, async (req, res) => {
    try {
        const project = await getPublicProjectById(req);
        res.json(successResponse('Public project retrieved successfully', project));
    } catch (error) {
        if (error.message === 'Project not found') {
            return res.status(404).json(errorResponse('Project not found', 404));
        }
        console.error('Route get public project error:', error);
        res.status(500).json(errorResponse('Server error', 500));
    }
});

module.exports = router;