import z from 'zod';

export const CreateLessonValidationSchema = z.object({
  courseId: z.string({ error: 'Course ID is required' }),
  title: z.string({ error: 'Title is required' }),
  content: z.string().optional(),
  videoUrl: z.string().optional(),
  duration: z.number().optional(),
  order: z.number().optional(),
  isPreview: z.boolean().optional(),
});

export const UpdateLessonValidationSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  videoUrl: z.string().optional(),
  duration: z.number().optional(),
  order: z.number().optional(),
  isPreview: z.boolean().optional(),
});
