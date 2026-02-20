import { Router } from 'express';
import { UserController } from './user.controller';
import validationData from '../../utils/validationData';
import { UserValidation } from './user.validation';
import auth from '../../middleware/auth';
import { UserRole } from '@prisma/client';

const router = Router();

router.post(
  '/create-admin',
  auth(UserRole.SUPER_ADMIN),
  validationData(UserValidation.AdminSchemaValidation),
  UserController.CreateUserIntoDB,
);

router.post(
  '/register',
  validationData(UserValidation.UserSchemaValidation),
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
