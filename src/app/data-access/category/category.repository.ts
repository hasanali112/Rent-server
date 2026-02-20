import prisma from '../../utils/prisma';

const create = async (data: { name: string; slug: string }) => {
  return await prisma.category.create({ data });
};

const findAll = async () => {
  return await prisma.category.findMany();
};

const update = async (
  id: string,
  data: Partial<{ name: string; slug: string }>,
) => {
  return await prisma.category.update({
    where: { id },
    data,
  });
};

const deleteById = async (id: string) => {
  return await prisma.category.delete({ where: { id } });
};

export const CategoryRepository = {
  create,
  findAll,
  update,
  deleteById,
};
