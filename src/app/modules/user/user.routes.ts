import { Router } from 'express';
import { UserController } from './user.controller';
import validationData from '../../utils/validationData';
import { CreateAdminValidationSchema } from './dto/create-admin.dto';
import { CreateUserValidationSchema } from './dto/create-user.dto';
import auth from '../../middleware/auth';
import { UserRole } from '@prisma/client';

const router = Router();

router.post(
  '/create-admin',
  auth(UserRole.SUPER_ADMIN),
  validationData(CreateAdminValidationSchema),
  UserController.CreateUserIntoDB,
);

router.post(
  '/register',
  validationData(CreateUserValidationSchema),
  UserController.registration,
);

router.patch(
  '/suspend/:id',
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  UserController.suspendUser,
);

router.get(
  '/',
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  UserController.getAllUsers,
);

export const UserRouter = router;
