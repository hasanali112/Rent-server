import z from 'zod';

export const EnrollInCourseValidationSchema = z.object({
  courseId: z.string({ error: 'Course ID is required' }),
});
