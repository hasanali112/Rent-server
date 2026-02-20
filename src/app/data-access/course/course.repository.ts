import prisma from '../../utils/prisma';

const create = async (data: any) => {
  return await prisma.course.create({ data });
};

const findAll = async (options: {
  searchTerm?: string;
  filter?: any;
  sort?: { field: string; order: 'asc' | 'desc' };
  pagination?: { cursor?: string; take?: number };
}) => {
  const { searchTerm, filter, sort, pagination } = options;
  const where: any = { ...filter };

  if (searchTerm) {
    where.OR = [
      { title: { contains: searchTerm, mode: 'insensitive' } },
      { description: { contains: searchTerm, mode: 'insensitive' } },
    ];
  }

  const queryArgs: any = {
    where,
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
    orderBy: sort ? { [sort.field]: sort.order } : { createdAt: 'desc' },
    take: pagination?.take || 10,
  };

  if (pagination?.cursor) {
    queryArgs.cursor = { id: pagination.cursor };
    queryArgs.skip = 1; // Skip the cursor itself
  }

  return await prisma.course.findMany(queryArgs);
};

const findById = async (id: string) => {
  return await prisma.course.findUnique({
    where: { id },
    include: {
      category: true,
      instructor: true,
      lessons: {
        orderBy: { order: 'asc' },
      },
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
  return await prisma.course.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};

export const CourseRepository = {
  create,
  findAll,
  findById,
  findInstructorCourses,
  update,
  deleteById,
};
