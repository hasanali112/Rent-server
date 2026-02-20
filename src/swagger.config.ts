import swaggerJsdoc from 'swagger-jsdoc';
import * as path from 'path';
import { swaggerRegistry } from './app/utils/swaggerRegistry';

// Import all controllers to register their paths
import './app/modules/health/health.controller';
import './app/modules/user/user.controller';
import './app/modules/auth/auth.controller';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'LMS API Management',
      version: '1.0.0',
      description: 'API documentation for LMS Rent Services',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local development server',
      },
    ],
    tags: [
      { name: 'Health', description: 'API Health Check' },
      { name: 'Authentication', description: 'User authentication' },
      { name: 'User Management', description: 'User management' },
    ],
    paths: swaggerRegistry.getPaths(),
  },
  apis: [], // No longer scanning files since we manually register
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
