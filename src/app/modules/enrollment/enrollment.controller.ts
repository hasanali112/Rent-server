import { createController } from '../../utils/createController';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { EnrollmentService } from './enrollment.service';

const enrollInCourse = createController({
  path: '/api/v1/enrollment/enroll',
  method: 'post',
  doc: {
    tags: ['Enrollment Management'],
    summary: 'Enroll in a course',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['courseId'],
            properties: {
              courseId: { type: 'string' },
            },
          },
        },
      },
    },
    responses: { 201: { description: 'Enrolled successfully' } },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  handler: async (req, res) => {
    const { courseId } = req.body;
    const result = await EnrollmentService.enrollInCourse(
      req.user.id,
      courseId,
    );
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Enrolled successfully',
      data: result,
    });
  },
});

const getMyEnrolledCourses = createController({
  path: '/api/v1/enrollment/my-courses',
  method: 'get',
  doc: {
    tags: ['Enrollment Management'],
    summary: 'Get all courses I am enrolled in',
    responses: { 200: { description: 'Courses retrieved successfully' } },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  handler: async (req, res) => {
    const result = await EnrollmentService.getMyEnrolledCourses(req.user.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Courses retrieved successfully',
      data: result,
    });
  },
});

const dropCourse = createController({
  path: '/api/v1/enrollment/drop/:id',
  method: 'patch',
  doc: {
    tags: ['Enrollment Management'],
    summary: 'Drop a course',
    parameters: [
      { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
    ],
    responses: { 200: { description: 'Course dropped successfully' } },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  handler: async (req, res) => {
    const result = await EnrollmentService.dropCourse(req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Course dropped successfully',
      data: result,
    });
  },
});

const completeCourse = createController({
  path: '/api/v1/enrollment/complete/:id',
  method: 'patch',
  doc: {
    tags: ['Enrollment Management'],
    summary: 'Mark a course as completed',
    parameters: [
      { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
    ],
    responses: { 200: { description: 'Course marked as completed' } },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  handler: async (req, res) => {
    const result = await EnrollmentService.completeCourse(req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Course marked as completed',
      data: result,
    });
  },
});

export const EnrollmentController = {
  enrollInCourse,
  getMyEnrolledCourses,
  dropCourse,
  completeCourse,
};
