const { body } = require('express-validator');

const validateAccessRequest = [
    body('email')
        .isEmail()
        .withMessage('Valid email is required')
];

module.exports = validateAccessRequest;