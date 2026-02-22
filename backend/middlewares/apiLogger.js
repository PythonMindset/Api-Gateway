const { logApiCall } = require('../controllers/middleware/apiLogger');

const apiLogger = async (req, res, next) => {
    const originalEnd = res.end;
    res.end = function(...args) {
        const statusCode = res.statusCode;
        let level = 'info';
        
        if (statusCode >= 500) {
            level = 'error';
        } else if (statusCode >= 400) {
            level = 'warning';
        }
        
        const logData = {
            endpoint: req.originalUrl || req.url,
            method: req.method,
            user_id: req.user?.id || null,
            status_code: statusCode,
            level: level
        };
        
        logApiCall(logData).catch(err => {
            console.error('Failed to log API call:', err);
        });
        originalEnd.apply(this, args);
    };
    next();
};

module.exports = apiLogger;