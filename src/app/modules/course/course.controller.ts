import { createController } from '../../utils/createController';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { CourseService } from './course.service';

const getAllCourses = createController({
  path: '/api/v1/courses',
  method: 'get',
  doc: {
    tags: ['Course Management'],
    summary: 'Get all courses with search, filtering, and pagination',
    responses: { 200: { description: 'Courses retrieved successfully' } },
  },
  handler: async (req, res) => {
    const result = await CourseService.getAllCourses(req.query);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Courses retrieved successfully',
      data: result,
    });
  },
});

const createCourse = createController({
  path: '/api/v1/courses',
  method: 'post',
  doc: {
    tags: ['Course Management'],
    summary: 'Create a new course',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['title', 'description', 'price', 'categoryId'],
            properties: {
              title: { type: 'string' },
              description: { type: 'string' },
              price: { type: 'number' },
              categoryId: { type: 'string' },
              thumbnailUrl: { type: 'string' },
              isFree: { type: 'boolean' },
            },
          },
        },
      },
    },
    responses: { 201: { description: 'Course created successfully' } },
  },
  handler: async (req, res) => {
    const result = await CourseService.createCourse(req.user.id, req.body);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Course created successfully',
      data: result,
    });
  },
});

const getMyCourses = createController({
  path: '/api/v1/courses/my-courses',
  method: 'get',
  doc: {
    tags: ['Course Management'],
    summary: 'Get instructor specific courses',
    responses: { 200: { description: 'Courses retrieved successfully' } },
  },
  handler: async (req, res) => {
    const result = await CourseService.getMyCourses(req.user.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Courses retrieved successfully',
      data: result,
    });
  },
});

const updateCourse = createController({
  path: '/api/v1/courses/:id',
  method: 'patch',
  doc: {
    tags: ['Course Management'],
    summary: 'Update course details',
    parameters: [
      { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              title: { type: 'string' },
              description: { type: 'string' },
              price: { type: 'number' },
              categoryId: { type: 'string' },
              thumbnailUrl: { type: 'string' },
              status: {
                type: 'string',
                enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'],
              },
            },
          },
        },
      },
    },
    responses: { 200: { description: 'Course updated successfully' } },
  },
  handler: async (req, res) => {
    const result = await CourseService.updateCourse(req.params.id, req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Course updated successfully',
      data: result,
    });
  },
});

const deleteCourse = createController({
  path: '/api/v1/courses/:id',
  method: 'delete',
  doc: {
    tags: ['Course Management'],
    summary: 'Delete a course',
    parameters: [
      { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
    ],
    responses: { 200: { description: 'Course deleted successfully' } },
  },
  handler: async (req, res) => {
    await CourseService.deleteCourse(req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Course deleted successfully',
      data: null,
    });
  },
});

const getInstructorAnalytics = createController({
  path: '/api/v1/courses/analytics',
  method: 'get',
  doc: {
    tags: ['Course Management'],
    summary: 'Get instructor analytics',
    responses: { 200: { description: 'Analytics retrieved successfully' } },
  },
  handler: async (req, res) => {
    const result = await CourseService.getInstructorAnalytics(req.user.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Analytics retrieved successfully',
      data: result,
    });
  },
});

const updateCourseStatus = createController({
  path: '/api/v1/courses/:id/status',
  method: 'patch',
  doc: {
    tags: ['Course Management'],
    summary: 'Update course status',
    parameters: [
      { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['status'],
            properties: {
              status: {
                type: 'string',
                enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'],
              },
            },
          },
        },
      },
    },
    responses: { 200: { description: 'Course status updated successfully' } },
  },
  handler: async (req, res) => {
    const result = await CourseService.updateCourseStatus(
      req.params.id,
      req.body.status,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Course status updated successfully',
      data: result,
    });
  },
});

export const CourseController = {
  createCourse,
  getAllCourses,
  getMyCourses,
  updateCourse,
  updateCourseStatus,
  deleteCourse,
  getInstructorAnalytics,
};
