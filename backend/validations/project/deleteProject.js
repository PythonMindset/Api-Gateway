const { param } = require('express-validator');

const validateDeleteProject = [
    param('id').isInt({ min: 1 }).withMessage('Valid project ID is required')
];

module.exports = validateDeleteProject;