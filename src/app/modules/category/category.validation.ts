import z from 'zod';

const createCategoryValidation = z.object({
  categoryName: z.string({ message: 'Category name is required' }),
  categoryImage: z.string({ message: 'Category image is required' }),
});

const updateCategoryValidation = z.object({
  categoryName: z.string().optional(),
  categoryImage: z.string().optional(),
});

export const CategoryValidation = {
  createCategoryValidation,
  updateCategoryValidation,
};
