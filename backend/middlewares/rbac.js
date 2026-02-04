const { errorResponse } = require('../utils/responseformat');

const requireAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json(errorResponse('Authentication required', 401));
    }
    if (req.user.role !== 'admin') {
        return res.status(403).json(errorResponse(
            'Access denied. You do not have permission to access this resource.',
            403
        ));
    }
    next();
};

const requireViewerOrAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json(errorResponse('Authentication required', 401));
    }
    if (req.user.role !== 'viewer' && req.user.role !== 'admin') {
        return res.status(403).json(errorResponse(
            'Access denied. Invalid user role.',
            403
        ));
    }
    next();
};

const requireRole = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json(errorResponse('Authentication required', 401));
        }
        const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
        if (!roles.includes(req.user.role)) {
            return res.status(403).json(errorResponse(
                `Access denied. You do not have permission to access this resource.`,
                403
            ));
        }
        next();
    };
};

const requireUserManagementAccess = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json(errorResponse('Authentication required', 401));
    }
    if (req.user.role !== 'admin') {
        return res.status(403).json(errorResponse(
            'Access denied. Only administrators can perform user management operations.',
            403
        ));
    }
    next();
};

module.exports = {
    requireAdmin,
    requireViewerOrAdmin,
    requireRole,
    requireUserManagementAccess
};