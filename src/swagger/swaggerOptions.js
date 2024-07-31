const swaggerJsdoc = require('swagger-jsdoc')

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Tiruppur Techies API Documentation',
            version: '1.0.0',
            description: 'API documentation for Tiruppur Techies project',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description:
                        'Enter your bearer token in the format **Bearer <token>**',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/routes/*.js'], // Path to the API route files
}

const specs = swaggerJsdoc(options)

module.exports = specs
