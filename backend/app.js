const express = require('express');
const cors = require('cors');
const { successResponse, errorResponse } = require('./utils/responseformat');
const { swaggerUi, swaggerSpec } = require('./config/swagger');

const app = express();

// Middleware
app.use(cors());
app.use(require('./middlewares/rateLimiter').createGlobalRateLimiter());
app.use(express.json());
app.use(require('./middlewares/apiLogger'));

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/auth', require('./routes/auth/login'));
app.use('/auth', require('./routes/auth/accessRequest'));
app.use('/user', require('./routes/user/changePassword'));

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

module.exports = app;