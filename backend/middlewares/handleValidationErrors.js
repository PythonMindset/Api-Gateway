const { validationResult } = require('express-validator');
const { errorResponse } = require('../utils/responseformat');

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.status(400).json(errorResponse(errorMessages.join(', '), 400));
    }
    next();
};

module.exports = handleValidationErrors;