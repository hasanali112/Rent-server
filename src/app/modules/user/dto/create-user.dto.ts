import z from 'zod';

export const CreateUserValidationSchema = z.object({
  name: z.string({ error: 'Name is required' }),
  email: z.string().email().optional(),
  contactNumber: z.string().optional(),
  profilePhoto: z.string().optional(),
  role: z.enum(['HOST', 'CUSTOMER', 'STUDENT', 'INSTRUCTOR']),
  password: z.string().optional(),
});
