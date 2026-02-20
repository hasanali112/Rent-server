import prisma from '../../utils/prisma';

const create = async (data: any) => {
  return await prisma.course.create({ data });
};

const findAll = async () => {
  return await prisma.course.findMany({
    include: {
      category: true,
      instructor: {
        select: {
          id: true,
          email: true,
          contactNumber: true,
          role: true,
          status: true,
        },
      },
    },
  });
};

const findById = async (id: string) => {
  return await prisma.course.findUnique({
    where: { id },
    include: {
      category: true,
      instructor: true,
    },
  });
};

const findInstructorCourses = async (instructorId: string) => {
  return await prisma.course.findMany({
    where: { instructorId },
    include: {
      category: true,
      _count: {
        select: { enrollments: true },
      },
    },
  });
};

const update = async (id: string, data: any) => {
  return await prisma.course.update({
    where: { id },
    data,
  });
};

const deleteById = async (id: string) => {
  return await prisma.course.delete({ where: { id } });
};

export const CourseRepository = {
  create,
  findAll,
  findById,
  findInstructorCourses,
  update,
  deleteById,
};
