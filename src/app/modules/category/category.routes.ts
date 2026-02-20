import { Router } from 'express';
import { CategoryController } from './category.controller';
import auth from '../../middleware/auth';
import { UserRole } from '@prisma/client';

const router = Router();

router.post(
  '/',
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  CategoryController.createCategory,
);

router.get('/', CategoryController.getAllCategories);

router.patch(
  '/:id',
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  CategoryController.updateCategory,
);

router.delete(
  '/:id',
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  CategoryController.deleteCategory,
);

export const CategoryRouter = router;
