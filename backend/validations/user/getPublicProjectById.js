const { body, param, query, validationResult } = require('express-validator');

const validateGetPublicProjectById = [
    param('id').isInt({ min: 1 }).withMessage('Project ID must be a positive integer'),
];

module.exports = validateGetPublicProjectById;