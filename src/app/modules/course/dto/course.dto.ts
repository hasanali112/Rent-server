import z from 'zod';

export const CreateCourseValidationSchema = z.object({
  title: z.string({ error: 'Title is required' }),
  description: z.string({ error: 'Description is required' }),
  price: z.number({ error: 'Price is required' }).min(0),
  categoryId: z.string({ error: 'Category ID is required' }),
  thumbnailUrl: z.string().optional(),
  isFree: z.boolean().optional(),
});

export const UpdateCourseValidationSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  price: z.number().min(0).optional(),
  categoryId: z.string().optional(),
  thumbnailUrl: z.string().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
});
