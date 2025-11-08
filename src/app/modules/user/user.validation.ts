import z from 'zod';

const AdminSchemaValidation = z.object({
  name: z.string({ error: 'Name is required' }),
  email: z.email().optional(),
  contactNumber: z.string().optional(),
  password: z.string().optional(),
});

const UserSchemaValidation = z.object({
  name: z.string({ error: 'Name is required' }),
  email: z.email().optional(),
  contactNumber: z.string().optional(),
  profilePhoto: z.string().optional(),
  role: z.enum(['HOST', 'CUSTOMER']),
  password: z.string().optional(),
});

export const UserValidation = {
  AdminSchemaValidation,
  UserSchemaValidation,
};
