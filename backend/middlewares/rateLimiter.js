const { errorResponse } = require('../utils/responseformat');

const createGlobalRateLimiter = () => {
    const windowMs = parseInt(process.env.GLOBAL_RATE_LIMIT_WINDOW_MS) || 60000;
    const max = parseInt(process.env.GLOBAL_RATE_LIMIT_MAX) || 1000;

    const requests = new Map();

    return (req, res, next) => {
        const ip = req.ip || req.connection.remoteAddress || 'unknown';
        const now = Date.now();

        if (req.path === '/health' || req.path.startsWith('/api-docs')) {
            return next();
        }

        let entry = requests.get(ip);
        if (!entry || now > entry.resetTime) {
            entry = {
                count: 0,
                resetTime: now + windowMs
            };
            requests.set(ip, entry);
        }

        entry.count++;
        if (entry.count > max) {
            const resetInSeconds = Math.ceil((entry.resetTime - now) / 1000);

            return res.status(429).json(errorResponse(
                `Too many requests. Try again in ${resetInSeconds} seconds.`,
                429
            ));
        }

        res.set({
            'X-RateLimit-Limit': max,
            'X-RateLimit-Remaining': Math.max(0, max - entry.count),
            'X-RateLimit-Reset': new Date(entry.resetTime).toISOString()
        });
        next();
    };
};

const createUserRateLimiter = () => {
    const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 60000;
    const max = parseInt(process.env.RATE_LIMIT_MAX) || 100;

    return (req, res, next) => {
        const key = req.user?.id ? `user_${req.user.id}` : (req.ip || req.connection.remoteAddress || 'unknown');
        const now = Date.now();

        let entry = createUserRateLimiter.requests.get(key);
        if (!entry || now > entry.resetTime) {
            entry = {
                count: 0,
                resetTime: now + windowMs
            };
            createUserRateLimiter.requests.set(key, entry);
        }

        entry.count++;

        if (entry.count > max) {
            const resetInSeconds = Math.ceil((entry.resetTime - now) / 1000);

            return res.status(429).json(errorResponse(
                `Too many requests. Try again in ${resetInSeconds} seconds.`,
                429
            ));
        }

        res.set({
            'X-RateLimit-Limit': max,
            'X-RateLimit-Remaining': Math.max(0, max - entry.count),
            'X-RateLimit-Reset': new Date(entry.resetTime).toISOString()
        });
        next();
    };
};

createUserRateLimiter.requests = new Map();

module.exports = createUserRateLimiter;
module.exports.createGlobalRateLimiter = createGlobalRateLimiter;
