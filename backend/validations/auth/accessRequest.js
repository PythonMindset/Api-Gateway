const { body } = require('express-validator');

const validateAccessRequest = [
    body('email')
        .isEmail()
        .withMessage('Valid email is required'),
    body('name')
        .isLength({ min: 1 })
        .withMessage('Name is required'),
    body('description')
        .optional()
        .isLength({ max: 1000 })
        .withMessage('Description must be less than 1000 characters')
];

module.exports = validateAccessRequest;