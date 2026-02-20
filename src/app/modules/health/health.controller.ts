/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { createController } from '../../utils/createController';

const healthCheck = createController({
  path: '/',
  method: 'get',
  doc: {
    tags: ['Health'],
    summary: 'API Health Check',
    description: 'Check if the server is running and healthy',
    responses: {
      200: {
        description: 'Server is healthy',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                statusCode: {
                  type: 'integer',
                  example: 200,
                },
                success: {
                  type: 'boolean',
                  example: true,
                },
                message: {
                  type: 'string',
                  example: 'LMS Server is running successfully!',
                },
              },
            },
          },
        },
      },
    },
  },
  handler: async (req: Request, res: Response) => {
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'LMS Server is running successfully!',
    });
  },
});

export const HealthController = {
  healthCheck,
};
