/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createController } from '../../utils/createController';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { TUser } from './user.interface';
import { UserService } from './user.service';

//create adming
const CreateUserIntoDB = createController({
  path: '/api/v1/users/create-admin',
  method: 'post',
  doc: {
    tags: ['User Management'],
    summary: 'Create a new Admin user',
    description:
      'Creates a new admin user along with an associated user record. Password will be hashed before saving.',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['name', 'password', 'contactNumber'],
            properties: {
              name: {
                type: 'string',
                example: 'Hasan Khan',
              },
              email: {
                type: 'string',
                format: 'email',
                example: 'admin@example.com',
              },
              contactNumber: {
                type: 'string',
                example: '+8801777000000',
              },
              profilePhoto: {
                type: 'string',
                format: 'uri',
                example: 'https://example.com/profile-photo.jpg',
              },
              password: {
                type: 'string',
                format: 'password',
                example: 'StrongP@ss123',
              },
            },
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Admin created successfully',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                statusCode: {
                  type: 'integer',
                  example: 201,
                },
                success: {
                  type: 'boolean',
                  example: true,
                },
                message: {
                  type: 'string',
                  example: 'Admin created successfully',
                },
                data: {
                  type: 'object',
                  description: 'Created resource data',
                },
              },
            },
          },
        },
      },
      400: {
        description: 'Invalid request payload',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                statusCode: {
                  type: 'integer',
                  example: 201,
                },
                success: {
                  type: 'boolean',
                  example: true,
                },
                message: {
                  type: 'string',
                  example: 'Admin created successfully',
                },
                data: {
                  type: 'object',
                  description: 'Created resource data',
                },
              },
            },
          },
        },
      },
      409: {
        description: 'Email or contact number already exists',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                statusCode: {
                  type: 'integer',
                  example: 201,
                },
                success: {
                  type: 'boolean',
                  example: true,
                },
                message: {
                  type: 'string',
                  example: 'Admin created successfully',
                },
                data: {
                  type: 'object',
                  description: 'Created resource data',
                },
              },
            },
          },
        },
      },
      500: {
        description: 'Internal server error',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                statusCode: {
                  type: 'integer',
                  example: 201,
                },
                success: {
                  type: 'boolean',
                  example: true,
                },
                message: {
                  type: 'string',
                  example: 'Admin created successfully',
                },
                data: {
                  type: 'object',
                  description: 'Created resource data',
                },
              },
            },
          },
        },
      },
    },
  },
  handler: async (req, res) => {
    const payload: TUser = req.body;
    const result = await UserService.createAdmin(payload);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Admin created successfully',
      data: result,
    });
  },
});

//host/customer registration
const registration = createController({
  path: '/api/v1/users/register',
  method: 'post',
  doc: {
    tags: ['Authentication'],
    summary: 'User registration',
    description: 'Register a new user account (HOST or CUSTOMER role)',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['name', 'contactNumber', 'password', 'role'],
            properties: {
              name: {
                type: 'string',
                example: 'John Doe',
              },
              email: {
                type: 'string',
                format: 'email',
                example: 'john@example.com',
              },
              contactNumber: {
                type: 'string',
                example: '+8801777000000',
              },
              profilePhoto: {
                type: 'string',
                format: 'uri',
                example: 'https://example.com/profile-photo.jpg',
              },
              password: {
                type: 'string',
                format: 'password',
                example: 'StrongP@ss123',
              },
              role: {
                type: 'string',
                enum: ['HOST', 'CUSTOMER'],
                example: 'HOST',
              },
            },
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Registration successful',
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
                  example: 'User registered successfully',
                },
                data: {
                  type: 'object',
                  properties: {
                    accessToken: {
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
        description: 'Invalid request payload',
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
      409: {
        description: 'Email or contact number already exists',
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
    const payload: TUser = req.body;
    const result = await UserService.resgisterUser(payload);
    const { refreshToken, accessToken } = result;
    res.cookie('UserSeassionID', refreshToken, {
      secure: false,
      httpOnly: true,
    });
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'User created successfully',
      data: {
        accessToken: accessToken,
      },
    });
  },
});

const suspendUser = createController({
  path: '/api/v1/users/suspend/:id',
  method: 'patch',
  doc: {
    tags: ['User Management'],
    summary: 'Suspend or activate a user',
    description:
      'Allows Super Admin to suspend (block) or activate a user account.',
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: { type: 'string' },
      },
    ],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['isSuspended'],
            properties: {
              isSuspended: { type: 'boolean' },
            },
          },
        },
      },
    },
    responses: {
      200: { description: 'User status updated successfully' },
    },
  },
  handler: async (req, res) => {
    const { id } = req.params;
    const { isSuspended } = req.body;
    const result = await UserService.suspendUser(
      id,
      isSuspended,
      req.user.role,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `User ${isSuspended ? 'suspended' : 'activated'} successfully`,
      data: result,
    });
  },
});

const getAllUsers = createController({
  path: '/api/v1/users',
  method: 'get',
  doc: {
    tags: ['User Management'],
    summary: 'Get all users',
    description: 'Allows Super Admin to view all users across the platform.',
    responses: {
      200: { description: 'Users retrieved successfully' },
    },
  },
  handler: async (req, res) => {
    const result = await UserService.getAllUsers();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Users retrieved successfully',
      data: result,
    });
  },
});

export const UserController = {
  CreateUserIntoDB,
  registration,
  suspendUser,
  getAllUsers,
};
