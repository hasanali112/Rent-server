import prisma from '../../utils/prisma';
import { EnrollmentStatus } from '@prisma/client';

const create = async (data: { studentId: string; courseId: string }) => {
  return await prisma.$transaction(async tx => {
    return await tx.enrollment.create({
      data,
      include: {
        course: true,
      },
    });
  });
};

const updateStatus = async (id: string, status: EnrollmentStatus) => {
  return await prisma.enrollment.update({
    where: { id },
    data: { status },
  });
};

const findMyEnrollments = async (studentId: string) => {
  return await prisma.enrollment.findMany({
    where: { studentId },
    include: {
      course: {
        include: {
          category: true,
          instructor: {
            select: {
              id: true,
              email: true,
              contactNumber: true,
            },
          },
        },
      },
    },
  });
};

const findUnique = async (studentId: string, courseId: string) => {
  return await prisma.enrollment.findUnique({
    where: {
      studentId_courseId: {
        studentId,
        courseId,
      },
    },
  });
};

export const EnrollmentRepository = {
  create,
  updateStatus,
  findMyEnrollments,
  findUnique,
};
