const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Otaku Play Studio API',
            version: '1.0.0',
            description: 'API pour l\'application Otaku Play Studio - Plateforme de quiz anime gamifiée',
            contact: {
                name: 'Otaku Play Team'
            }
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Serveur de développement'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Entrez le token JWT reçu lors de la connexion'
                }
            },
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            description: 'ID unique de l\'utilisateur'
                        },
                        username: {
                            type: 'string',
                            description: 'Pseudo de l\'utilisateur'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'Email de l\'utilisateur'
                        },
                        avatar: {
                            type: 'string',
                            description: 'URL de l\'avatar'
                        },
                        level: {
                            type: 'number',
                            description: 'Niveau du joueur'
                        },
                        xp: {
                            type: 'number',
                            description: 'Points d\'expérience'
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Date de création du compte'
                        }
                    }
                },
                AuthResponse: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean'
                        },
                        data: {
                            type: 'object',
                            properties: {
                                user: {
                                    $ref: '#/components/schemas/User'
                                },
                                token: {
                                    type: 'string',
                                    description: 'Token JWT pour l\'authentification'
                                }
                            }
                        }
                    }
                },
                Error: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: false
                        },
                        message: {
                            type: 'string',
                            description: 'Message d\'erreur'
                        }
                    }
                }
            }
        }
    },
    apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
