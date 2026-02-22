const express = require('express');
const router = express.Router();

const authenticateToken = require('../../middlewares/authenticateToken');
const handleValidationErrors = require('../../middlewares/handleValidationErrors');
const { requireAdmin } = require('../../middlewares/rbac');
const { successResponse, errorResponse } = require('../../utils/responseformat');
const createUserRateLimiter = require('../../middlewares/rateLimiter');
const validateListProjects = require('../../validations/project/listProjects');
const validateGetProject = require('../../validations/project/getProject');
const validateCreateProject = require('../../validations/project/createProject');
const validateUpdateProject = require('../../validations/project/updateProject');
const validateDeleteProject = require('../../validations/project/deleteProject');
const listProjects = require('../../controllers/project/listProjects');
const getProject = require('../../controllers/project/getProject');
const createProject = require('../../controllers/project/createProject');
const updateProject = require('../../controllers/project/updateProject');
const deleteProject = require('../../controllers/project/deleteProject');

router.use(createUserRateLimiter());
router.use(authenticateToken);
router.use(requireAdmin);
router.use(handleValidationErrors);

router.get('/', validateListProjects, async (req, res) => {
    try {
        const projects = await listProjects(req);
        res.json(successResponse('Projects retrieved successfully', projects));
    } catch (error) {
        console.error('Route list projects error:', error);
        res.status(500).json(errorResponse('Server error', 500));
    }
});

router.get('/:id', validateGetProject, async (req, res) => {
    try {
        const project = await getProject(req);
        res.json(successResponse('Project retrieved successfully', project));
    } catch (error) {
        if (error.message === 'Project not found') {
            return res.status(404).json(errorResponse('Project not found', 404));
        }
        console.error('Route get project error:', error);
        res.status(500).json(errorResponse('Server error', 500));
    }
});

router.post('/', validateCreateProject, async (req, res) => {
    try {
        const project = await createProject(req);
        res.status(201).json(successResponse('Project created successfully', project));
    } catch (error) {
        console.error('Route create project error:', error);
        res.status(500).json(errorResponse('Server error', 500));
    }
});

router.put('/:id', validateUpdateProject, async (req, res) => {
    try {
        const project = await updateProject(req);
        res.json(successResponse('Project updated successfully', project));
    } catch (error) {
        if (error.message === 'Project not found or not authorized') {
            return res.status(404).json(errorResponse('Project not found or not authorized', 404));
        }
        console.error('Route update project error:', error);
        res.status(500).json(errorResponse('Server error', 500));
    }
});

router.delete('/:id', validateDeleteProject, async (req, res) => {
    try {
        const result = await deleteProject(req);
        res.json(successResponse('Project deleted successfully', result));
    } catch (error) {
        if (error.message === 'Project not found or not authorized') {
            return res.status(404).json(errorResponse('Project not found or not authorized', 404));
        }
        console.error('Route delete project error:', error);
        res.status(500).json(errorResponse('Server error', 500));
    }
});

module.exports = router;