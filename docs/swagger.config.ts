const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'UberEats API',
            version: '1.0.0',
            description: 'Documentation de l’API UberEats',
        },
        servers: [
            {
                url: 'http://localhost:8000/v1',
                description: 'Version 1',
            },
            {
                url: 'http://localhost:8000/v2',
                description: 'Version 2',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth : {
                    type: 'http',
                    scheme: 'Bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    apis: [
        './docs/**/*.ts'
    ],
};

export default swaggerOptions;