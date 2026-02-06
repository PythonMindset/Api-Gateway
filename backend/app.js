const express = require('express');
const cors = require('cors');
const { cleanupOldLogs } = require('./services/cleanup/cleanupLogs');
const { cleanupInactiveViewers } = require('./services/cleanup/cleanupInactiveViewers');
const { successResponse, errorResponse } = require('./utils/responseformat');
const { swaggerUi, swaggerSpec } = require('./config/swagger');

const app = express();

// Middleware
app.use(cors());
app.use(require('./middlewares/rateLimiter').createGlobalRateLimiter());
app.use(express.json());

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/auth', require('./routes/auth/login'));
app.use('/auth', require('./routes/auth/accessRequest'));
app.use('/user', require('./routes/user/changePassword'));
app.use('/user', require('./routes/user/projects'));
app.use('/projects', require('./routes/project/project'));
app.use('/admin/api-logs', require('./routes/admin/api_logs'));
app.use('/admin', require('./routes/admin/accessRequests'));

// Health check
app.get('/health', (req, res) => {
    res.json(successResponse('Project Manager API is running'));
});

// 404 handler
app.use((req, res) => {
    res.status(404).json(errorResponse('Route not found', 404));
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json(errorResponse('Something went wrong!', 500));
});

// Schedule daily cleanup of old logs
function scheduleCleanup() {
    cleanupOldLogs();
    cleanupInactiveViewers();
    const ONE_DAY_MS = 24 * 60 * 60 * 1000;
    setTimeout(scheduleCleanup, ONE_DAY_MS);
}
scheduleCleanup();

module.exports = app;