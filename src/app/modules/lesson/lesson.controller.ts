import { createController } from '../../utils/createController';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { LessonService } from './index';

const addLesson = createController({
  path: '/api/v1/lessons',
  method: 'post',
  doc: {
    tags: ['Lesson Management'],
    summary: 'Add a lesson to a course',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['title', 'contentType', 'order', 'courseId'],
            properties: {
              title: { type: 'string' },
              contentType: { type: 'string', enum: ['VIDEO', 'TEXT'] },
              videoUrl: { type: 'string' },
              textContent: { type: 'string' },
              order: { type: 'integer' },
              isPreview: { type: 'boolean' },
              courseId: { type: 'string' },
            },
          },
        },
      },
    },
    responses: { 201: { description: 'Lesson created successfully' } },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  handler: async (req, res) => {
    const { courseId, ...lessonData } = req.body;
    const result = await LessonService.addLesson(courseId, lessonData);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Lesson created successfully',
      data: result,
    });
  },
});

const updateLesson = createController({
  path: '/api/v1/lessons/:id',
  method: 'patch',
  doc: {
    tags: ['Lesson Management'],
    summary: 'Update lesson details',
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
              contentType: { type: 'string', enum: ['VIDEO', 'TEXT'] },
              videoUrl: { type: 'string' },
              textContent: { type: 'string' },
              order: { type: 'integer' },
              isPreview: { type: 'boolean' },
            },
          },
        },
      },
    },
    responses: { 200: { description: 'Lesson updated successfully' } },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  handler: async (req, res) => {
    const result = await LessonService.updateLesson(req.params.id, req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Lesson updated successfully',
      data: result,
    });
  },
});

const deleteLesson = createController({
  path: '/api/v1/lessons/:id',
  method: 'delete',
  doc: {
    tags: ['Lesson Management'],
    summary: 'Delete a lesson',
    parameters: [
      { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
    ],
    responses: { 200: { description: 'Lesson deleted successfully' } },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  handler: async (req, res) => {
    await LessonService.deleteLesson(req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Lesson deleted successfully',
      data: null,
    });
  },
});

const reorderLessons = createController({
  path: '/api/v1/lessons/reorder/:courseId',
  method: 'patch',
  doc: {
    tags: ['Lesson Management'],
    summary: 'Reorder lessons in a course',
    parameters: [
      {
        name: 'courseId',
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
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                order: { type: 'integer' },
              },
            },
          },
        },
      },
    },
    responses: { 200: { description: 'Lessons reordered successfully' } },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  handler: async (req, res) => {
    await LessonService.reorderLessons(req.params.courseId, req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Lessons reordered successfully',
      data: null,
    });
  },
});

const getLessonsByCourse = createController({
  path: '/api/v1/lessons/course/:courseId',
  method: 'get',
  doc: {
    tags: ['Lesson Management'],
    summary: 'Get all lessons for a course',
    parameters: [
      {
        name: 'courseId',
        in: 'path',
        required: true,
        schema: { type: 'string' },
      },
    ],
    responses: { 200: { description: 'Lessons retrieved successfully' } },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  handler: async (req, res) => {
    const result = await LessonService.getLessonsByCourse(req.params.courseId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Lessons retrieved successfully',
      data: result,
    });
  },
});

export const LessonController = {
  addLesson,
  updateLesson,
  deleteLesson,
  reorderLessons,
  getLessonsByCourse,
};
