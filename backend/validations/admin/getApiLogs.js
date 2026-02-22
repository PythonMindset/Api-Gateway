const { query } = require('express-validator');

const validateGetApiLogs = [
    query('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Page must be a positive integer'),
    query('limit')
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage('Limit must be between 1 and 100'),
    query('user_id')
        .optional()
        .isInt({ min: 1 })
        .withMessage('User ID must be a positive integer'),
    query('endpoint')
        .optional()
        .isString()
        .isLength({ max: 500 })
        .withMessage('Endpoint must be a string with max length 500'),
    query('method')
        .optional()
        .isIn(['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'])
        .withMessage('Method must be a valid HTTP method'),
    query('status_code')
        .optional()
        .isInt({ min: 100, max: 599 })
        .withMessage('Status code must be between 100 and 599'),
    query('level')
        .optional()
        .isIn(['info', 'warning', 'error'])
        .withMessage('Level must be one of: info, warning, error'),
    query('role')
        .optional()
        .isIn(['admin', 'viewer'])
        .withMessage('Role must be either admin or viewer')
];

module.exports = validateGetApiLogs;