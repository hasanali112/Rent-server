import { Router } from 'express';
import { AuthController } from './auth.controller';
import validationData from '../../utils/validationData';
import { AuthValidation } from './auth.validation';

const router = Router();

router.post(
  '/login',
  validationData(AuthValidation.AuthSchemaValidation),
  AuthController.login,
);

export const AuthRouter = router;
