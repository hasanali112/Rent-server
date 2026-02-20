import { createController } from '../../utils/createController';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { AdminService } from './index';

const getGlobalAnalytics = createController({
  path: '/api/v1/admin/analytics',
  method: 'get',
  doc: {
    tags: ['Admin Features'],
    summary: 'Get global platform analytics',
    description:
      'Allows Super Admin to view total users, revenue, and enrollment statistics.',
    responses: {
      200: { description: 'Analytics retrieved successfully' },
    },
  },
  handler: async (req, res) => {
    const result = await AdminService.getGlobalAnalytics();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Global analytics retrieved successfully',
      data: result,
    });
  },
});

const overrideCourseStatus = createController({
  path: '/api/v1/admin/courses/:id/status',
  method: 'patch',
  doc: {
    tags: ['Admin Features'],
    summary: 'Override course status',
    description: 'Allows Super Admin to publish or archive any course.',
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
            required: ['status'],
            properties: {
              status: {
                type: 'string',
                enum: ['PUBLISHED', 'ARCHIVED', 'DRAFT'],
              },
            },
          },
        },
      },
    },
    responses: {
      200: { description: 'Course status overridden successfully' },
    },
  },
  handler: async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const result = await AdminService.overrideCourseStatus(id, status);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Course status updated successfully',
      data: result,
    });
  },
});

const updatePlatformConfig = createController({
  path: '/api/v1/admin/config',
  method: 'put',
  doc: {
    tags: ['Admin Features'],
    summary: 'Update platform-level configuration',
    description: 'Allows Super Admin to update global platform settings.',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              siteName: { type: 'string' },
              maintenanceMode: { type: 'boolean' },
              allowRegistration: { type: 'boolean' },
            },
          },
        },
      },
    },
    responses: {
      200: { description: 'Platform configuration updated successfully' },
    },
  },
  handler: async (req, res) => {
    const result = await AdminService.updatePlatformConfig(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Platform configuration updated successfully (Mock)',
      data: result,
    });
  },
});

const getOperationalAnalytics = createController({
  path: '/api/v1/admin/operational-analytics',
  method: 'get',
  doc: {
    tags: ['Admin Features'],
    summary: 'Get operational analytics',
    description:
      'Allows Admin to view enrollment growth, popular courses, and completion stats.',
    responses: {
      200: { description: 'Operational analytics retrieved successfully' },
    },
  },
  handler: async (req, res) => {
    const result = await AdminService.getOperationalAnalytics();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Operational analytics retrieved successfully',
      data: result,
    });
  },
});

const getAllCourses = createController({
  path: '/api/v1/admin/courses',
  method: 'get',
  doc: {
    tags: ['Admin Features'],
    summary: 'Get all courses',
    description: 'Allows Admin to view all courses on the platform.',
    responses: {
      200: { description: 'Courses retrieved successfully' },
    },
  },
  handler: async (req, res) => {
    const result = await AdminService.getAllCourses();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Courses retrieved successfully',
      data: result,
    });
  },
});

export const AdminController = {
  getGlobalAnalytics,
  overrideCourseStatus,
  updatePlatformConfig,
  getOperationalAnalytics,
  getAllCourses,
};
