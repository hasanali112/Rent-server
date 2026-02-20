import { createController } from '../../utils/createController';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { CourseService } from '../course';
import prisma from '../../utils/prisma';

const getEnrolledStudents = createController({
  path: '/api/v1/instructor/students',
  method: 'get',
  doc: {
    tags: ['Instructor Features'],
    summary: 'Get all students enrolled in my courses',
    responses: { 200: { description: 'Students retrieved successfully' } },
  },
  handler: async (req, res) => {
    const instructorId = req.user.id;
    const enrollments = await prisma.enrollment.findMany({
      where: {
        course: { instructorId },
      },
      include: {
        student: {
          select: {
            id: true,
            email: true,
            contactNumber: true,
            status: true,
          },
        },
        course: {
          select: { title: true },
        },
      },
    });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Students retrieved successfully',
      data: enrollments,
    });
  },
});

export const InstructorController = {
  getEnrolledStudents,
};
