import { Router } from 'express';
import { AuthController } from './auth.controller';
import validationData from '../../utils/validationData';
import { LoginValidationSchema } from './dto/login.dto';

const router = Router();

router.post(
  '/login',
  validationData(LoginValidationSchema),
  AuthController.login,
);

router.post('/logout', AuthController.logout);

export const AuthRouter = router;
