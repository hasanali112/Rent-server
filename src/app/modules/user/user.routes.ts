import { Router } from 'express';
import { UserController } from './user.controller';
import validationData from '../../utils/validationData';
import { UserValidation } from './user.validation';

const router = Router();

router.post(
  '/create-admin',
  validationData(UserValidation.AdminSchemaValidation),
  UserController.CreateUserIntoDB,
);

router.post(
  '/register',
  validationData(UserValidation.UserSchemaValidation),
  UserController.registration,
);

export const UserRouter = router;
