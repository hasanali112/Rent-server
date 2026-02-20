/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createController } from '../../utils/createController';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { TLogin } from './auth.interface';
import { AuthService } from './auth.service';

const login = createController({
  path: '/api/v1/auth/login',
  method: 'post',
  doc: {
    tags: ['Authentication'],
    summary: 'User login',
    description:
      'Authenticate user with email/phone and password, or Google OAuth',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              email: {
                type: 'string',
                format: 'email',
                example: 'user@example.com',
              },
              contactNumber: {
                type: 'string',
                example: '+8801777000000',
              },
              password: {
                type: 'string',
                format: 'password',
                example: 'password123',
              },
              provider: {
                type: 'string',
                enum: ['google'],
                example: 'google',
              },
              name: {
                type: 'string',
                example: 'John Doe',
              },
              profilePhoto: {
                type: 'string',
                format: 'uri',
                example: 'https://example.com/photo.jpg',
              },
            },
            oneOf: [
              {
                title: 'Email/Password Login',
                required: ['email', 'password'],
              },
              {
                title: 'Phone/Password Login',
                required: ['contactNumber', 'password'],
              },
              {
                title: 'Google OAuth Login',
                required: ['provider', 'name'],
              },
            ],
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Login successful',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean',
                  example: true,
                },
                message: {
                  type: 'string',
                  example: 'Login successful',
                },
                data: {
                  type: 'object',
                  properties: {
                    accessToken: {
                      type: 'string',
                      example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                    },
                    refreshToken: {
                      type: 'string',
                      example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                    },
                  },
                },
              },
            },
          },
        },
      },
      400: {
        description: 'Invalid credentials or missing password',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean',
                  example: false,
                },
                message: {
                  type: 'string',
                  example: 'Error message',
                },
                errorMessages: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      path: {
                        type: 'string',
                      },
                      message: {
                        type: 'string',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      404: {
        description: 'User not found',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean',
                  example: false,
                },
                message: {
                  type: 'string',
                  example: 'Error message',
                },
                errorMessages: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      path: {
                        type: 'string',
                      },
                      message: {
                        type: 'string',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  handler: async (req, res) => {
    const payload: TLogin = req.body;
    const result = await AuthService.login(payload);
    const { refreshToken, accessToken } = result;
    res.cookie('UserSeassionID', refreshToken, {
      secure: false,
      httpOnly: true,
    });
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'User logged in successfully',
      data: {
        accessToken,
      },
    });
  },
});

export const AuthController = {
  login,
};
