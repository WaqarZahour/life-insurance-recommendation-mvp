import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Life Insurance Recommendation API',
      version: '1.0.0',
      description: 'A RESTful API for generating life insurance recommendations based on user demographics and preferences.',
      contact: {
        name: 'API Support',
        email: 'support@lifeinsurance.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:8000/api',
        description: 'Development server'
      }
    ],
    components: {
      schemas: {
        RecommendationInput: {
          type: 'object',
          required: ['age', 'income', 'dependents', 'riskTolerance'],
          properties: {
            age: {
              type: 'integer',
              minimum: 18,
              maximum: 100,
              description: 'User age in years'
            },
            income: {
              type: 'number',
              minimum: 0,
              maximum: 10000000,
              description: 'Annual income in USD'
            },
            dependents: {
              type: 'integer',
              minimum: 0,
              maximum: 10,
              description: 'Number of dependents'
            },
            riskTolerance: {
              type: 'string',
              enum: ['low', 'medium', 'high'],
              description: 'Risk tolerance level'
            }
          }
        },
        RecommendationResponse: {
          type: 'object',
          properties: {
            recommendation: {
              type: 'string',
              description: 'Generated insurance recommendation'
            },
            explanation: {
              type: 'string',
              description: 'Explanation for the recommendation'
            }
          }
        },
        ApiResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              description: 'Whether the request was successful'
            },
            data: {
              type: 'object',
              description: 'Response data'
            },
            message: {
              type: 'string',
              description: 'Response message'
            }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            message: {
              type: 'string',
              description: 'Error message'
            },
            errors: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  field: {
                    type: 'string'
                  },
                  message: {
                    type: 'string'
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts']
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs }; 