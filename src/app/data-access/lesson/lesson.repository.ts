import prisma from '../../utils/prisma';

const create = async (data: any) => {
  return await prisma.lesson.create({ data });
};

const update = async (id: string, data: any) => {
  return await prisma.lesson.update({
    where: { id },
    data,
  });
};

const deleteById = async (id: string) => {
  return await prisma.lesson.delete({ where: { id } });
};

const findByCourse = async (courseId: string) => {
  return await prisma.lesson.findMany({
    where: { courseId },
    orderBy: { order: 'asc' },
  });
};

const updateOrder = async (
  courseId: string,
  orders: { id: string; order: number }[],
) => {
  const updatePromises = orders.map(item =>
    prisma.lesson.update({
      where: { id: item.id, courseId },
      data: { order: item.order },
    }),
  );
  await Promise.all(updatePromises);
};

export const LessonRepository = {
  create,
  update,
  deleteById,
  findByCourse,
  updateOrder,
};
