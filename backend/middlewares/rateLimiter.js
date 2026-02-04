const rateLimit = require('express-rate-limit');
const { errorResponse } = require('../utils/responseformat');

const getClientIP = (req) => {
    const forwarded = req.headers['x-forwarded-for'];
    if (forwarded) {
        return forwarded.split(',')[0].trim();
    }
    const realIP = req.headers['x-real-ip'] || req.headers['x-client-ip'];
    if (realIP) {
        return realIP;
    }
    return req.ip || req.connection.remoteAddress || 'unknown';
};

const createGlobalRateLimiter = () => {
    return rateLimit({
        windowMs: parseInt(process.env.GLOBAL_RATE_LIMIT_WINDOW_MS),
        max: parseInt(process.env.GLOBAL_RATE_LIMIT_MAX),
        keyGenerator: getClientIP,
        handler: (req, res) => {
            const resetTime = new Date(Date.now() + parseInt(process.env.GLOBAL_RATE_LIMIT_WINDOW_MS));
            const resetInSeconds = Math.ceil((resetTime - new Date()) / 1000);

            res.status(429).json(errorResponse(
                `Too many requests. Try again in ${resetInSeconds} seconds.`,
                429
            ));
        },
        standardHeaders: true,
        legacyHeaders: false,
        skip: (req) => {
            return req.path === '/health' || req.path.startsWith('/api-docs');
        }
    });
};

const createUserRateLimiter = () => {
    return rateLimit({
        windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS),
        max: parseInt(process.env.RATE_LIMIT_MAX),
        keyGenerator: (req) => {
            return req.user?.id ? `user_${req.user.id}` : getClientIP(req);
        },
        handler: (req, res) => {
            const resetTime = new Date(Date.now() + (parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000));
            const resetInSeconds = Math.ceil((resetTime - new Date()) / 1000);

            res.status(429).json(errorResponse(
                `Too many requests. Try again in ${resetInSeconds} seconds.`,
                429
            ));
        },
        standardHeaders: true,
        legacyHeaders: false,
    });
};

module.exports = createUserRateLimiter;
module.exports.createGlobalRateLimiter = createGlobalRateLimiter;