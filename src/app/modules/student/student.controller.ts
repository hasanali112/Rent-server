import { createController } from '../../utils/createController';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { StudentService } from './student.service';

const markLessonComplete = createController({
  path: '/api/v1/student/lessons/:lessonId/complete',
  method: 'post',
  doc: {
    tags: ['Student Progress'],
    summary: 'Mark a lesson as completed',
    parameters: [
      {
        name: 'lessonId',
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
            required: ['courseId'],
            properties: {
              courseId: { type: 'string' },
            },
          },
        },
      },
    },
    responses: { 200: { description: 'Lesson marked as complete' } },
  },
  handler: async (req, res) => {
    const { lessonId } = req.params;
    const { courseId } = req.body;
    const result = await StudentService.markLessonComplete(
      req.user.id,
      lessonId,
      courseId,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Lesson marked as complete',
      data: result,
    });
  },
});

const getCourseContent = createController({
  path: '/api/v1/student/courses/:courseId/content',
  method: 'get',
  doc: {
    tags: ['Student Progress'],
    summary: 'Get full course content for enrolled student',
    parameters: [
      {
        name: 'courseId',
        in: 'path',
        required: true,
        schema: { type: 'string' },
      },
    ],
    responses: { 200: { description: 'Content retrieved successfully' } },
  },
  handler: async (req, res) => {
    const { courseId } = req.params;
    const result = await StudentService.getCourseContent(req.user.id, courseId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Course content retrieved successfully',
      data: result,
    });
  },
});

export const StudentController = {
  markLessonComplete,
  getCourseContent,
};
