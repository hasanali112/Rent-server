import { Category } from '../../../../prisma/generated/client';
import { AppError } from '../../error/AppError';
import prisma from '../../utils/prisma';
import { filterValidData } from '../../utils/filterValidData';
import { getPaginationData, getPaginationMeta } from '../../utils/pagination';
import httpStatus from 'http-status';

//create category
const createCategory = async (paylaod: Category) => {
  const isExistCategory = await prisma.category.findFirst({
    where: {
      categoryName: paylaod.categoryName,
    },
  });

  if (isExistCategory) {
    throw new AppError(httpStatus.CONFLICT, 'Category already exist');
  }

  const category = await prisma.category.create({
    data: paylaod,
  });

  return category;
};

//get all category
const getAllCategory = async (page: number = 1, limit: number = 10) => {
  const { skip, take } = getPaginationData(page, limit);
  const categories = await prisma.category.findMany({
    skip,
    take,
  });
  const total = await prisma.category.count();

  return {
    data: categories,
    meta: getPaginationMeta(page, limit, total),
  };
};

//update category
const updateCategory = async (id: string, payload: Partial<Category>) => {
  const filteredData = filterValidData(payload);

  const category = await prisma.category.update({
    where: { id },
    data: filteredData,
  });

  return category;
};

//delete category
const deleteCategory = async (id: string) => {
  const category = await prisma.category.delete({
    where: { id },
  });

  return category;
};

export const CategoryService = {
  createCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
};
