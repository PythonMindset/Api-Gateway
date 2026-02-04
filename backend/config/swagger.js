const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Project Manager API',
        version: '1.0.0',
        description: 'API documentation for Project Manager application',
    },
    servers: [
        {
        url: `http://localhost:${process.env.PORT}`,
        description: 'Development server',
        },
    ],
    components: {
        securitySchemes: {
        bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
        },
        },
    },
    security: [
        {
        bearerAuth: [],
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./routes/**/*.js', './docs/**/*.js'], // Include routes and docs folders
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = {swaggerUi, swaggerSpec};