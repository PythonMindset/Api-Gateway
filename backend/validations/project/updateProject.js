const { body, param } = require('express-validator');

const validateUpdateProject = [
    param('id').isInt({ min: 1 }).withMessage('Valid project ID is required'),
    body('title')
        .optional()
        .isLength({ max: 255 })
        .withMessage('Title must be less than 255 characters'),
    body('description')
        .optional()
        .isString()
        .withMessage('Description must be a string'),
    body('tech_stack')
        .optional()
        .isString()
        .withMessage('Tech stack must be a string'),
    body('repo_url')
        .optional()
        .isURL()
        .withMessage('Repository URL must be a valid URL')
        .isLength({ max: 500 })
        .withMessage('Repository URL must be less than 500 characters'),
    body('status')
        .optional()
        .isIn(['planning', 'testing', 'completed', 'live', 'on_hold', 'archived'])
        .withMessage('Invalid status'),
    body('is_public')
        .optional()
        .isBoolean()
        .withMessage('is_public must be a boolean')
];

module.exports = validateUpdateProject;