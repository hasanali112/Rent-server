import z from 'zod';

export const CreateAdminValidationSchema = z.object({
  name: z.string({ error: 'Name is required' }),
  email: z.string().email().optional(),
  contactNumber: z.string().optional(),
  password: z.string().optional(),
});
