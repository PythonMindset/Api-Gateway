const { body } = require('express-validator');

const validateChangePassword = [
    body('currentPassword')
        .notEmpty()
        .withMessage('Current password is required'),
    body('newPassword')
        .isLength({ min: 8 })
        .withMessage('New password must be at least 8 characters long')
        .matches(/^(?=.*[a-z])/)
        .withMessage('New password must contain at least one lowercase letter')
        .matches(/^(?=.*[A-Z])/)
        .withMessage('New password must contain at least one uppercase letter')
        .matches(/^(?=.*\d)/)
        .withMessage('New password must contain at least one number'),
    body('confirmPassword')
        .notEmpty()
        .withMessage('Password confirmation is required')
        .custom((value, { req }) => {
            if (value !== req.body.newPassword) {
                throw new Error('Password confirmation does not match new password');
            }
            return true;
        })
];

module.exports = validateChangePassword;