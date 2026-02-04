const { logApiCall } = require('../controllers/middleware/apiLogger');

const apiLogger = async (req, res, next) => {
    const logData = {
        endpoint: req.originalUrl || req.url,
        method: req.method,
        user_id: req.user?.id || null
    };

    const originalEnd = res.end;
    res.end = function(...args) {
        logData.status_code = res.statusCode;
        logApiCall(logData).catch(err => {
            console.error('Failed to log API call:', err);
        });
        originalEnd.apply(this, args);
    };
    next();
};

module.exports = apiLogger;