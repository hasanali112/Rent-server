import swaggerJsdoc from 'swagger-jsdoc';
import * as path from 'path';
import { swaggerRegistry } from './app/utils/swaggerRegistry';

// Import all controllers to register their paths
import './app/modules/health/health.controller';
import './app/modules/user/user.controller';
import './app/modules/auth/auth.controller';
import './app/modules/admin/admin.controller';
import './app/modules/analytics/analytics.controller';
import './app/modules/category/category.controller';
import './app/modules/course/course.controller';
import './app/modules/lesson/lesson.controller';
import './app/modules/enrollment/enrollment.controller';
import './app/modules/student/student.controller';
import './app/modules/notification/notification.controller';

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
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    paths: swaggerRegistry.getPaths(),
  },
  apis: [], // No longer scanning files since we manually register
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
