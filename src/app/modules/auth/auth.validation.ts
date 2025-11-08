import z from 'zod';

const AuthSchemaValidation = z.object({
  name: z.string().optional(),
  email: z.email().optional(),
  contactNumber: z.string().optional(),
  profilePhoto: z.string().optional(),
  provider: z.string().optional(),
  password: z.string().optional(),
});

export const AuthValidation = {
  AuthSchemaValidation,
};
