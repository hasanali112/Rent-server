import { CategoryRepository } from '../../data-access/category';

const createCategory = async (data: { name: string; slug: string }) => {
  const result = await CategoryRepository.create(data);
  return result;
};

const getAllCategories = async () => {
  const result = await CategoryRepository.findAll();
  return result;
};

const updateCategory = async (
  id: string,
  data: Partial<{ name: string; slug: string }>,
) => {
  const result = await CategoryRepository.update(id, data);
  return result;
};

const deleteCategory = async (id: string) => {
  const result = await CategoryRepository.deleteById(id);
  return result;
};

export const CategoryService = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
