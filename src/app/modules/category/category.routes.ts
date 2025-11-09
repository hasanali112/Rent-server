import { Router } from 'express';
import { CategoryController } from './category.controller';
import validationData from '../../utils/validationData';
import { CategoryValidation } from './category.validation';

const router = Router();

router.post(
  '/create-category',
  validationData(CategoryValidation.createCategoryValidation),
  CategoryController.createCategory,
);

router.get('/get-all-category', CategoryController.getAllCategory);

router.patch(
  '/update-category/:id',
  validationData(CategoryValidation.updateCategoryValidation),
  CategoryController.updateCategory,
);

router.delete('/delete-category/:id', CategoryController.deleteCategory);

export const CategoryRouter = router;
