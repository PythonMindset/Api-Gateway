const { param } = require('express-validator');

const validateGetProject = [
    param('id').isInt({ min: 1 }).withMessage('Valid project ID is required')
];

module.exports = validateGetProject;