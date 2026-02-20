import { Router } from 'express';
import { LessonController } from './lesson.controller';
import auth from '../../middleware/auth';
import ownership from '../../middleware/ownership';
import { UserRole } from '@prisma/client';
import validationData from '../../utils/validationData';
import {
  CreateLessonValidationSchema,
  UpdateLessonValidationSchema,
} from './dto/lesson.dto';

const router = Router();

router.post(
  '/',
  auth(UserRole.INSTRUCTOR, UserRole.ADMIN, UserRole.SUPER_ADMIN),
  validationData(CreateLessonValidationSchema),
  LessonController.addLesson,
);

router.get(
  '/course/:courseId',
  auth(
    UserRole.INSTRUCTOR,
    UserRole.STUDENT,
    UserRole.ADMIN,
    UserRole.SUPER_ADMIN,
  ),
  LessonController.getLessonsByCourse,
);

router.patch(
  '/reorder/:courseId',
  auth(UserRole.INSTRUCTOR, UserRole.ADMIN, UserRole.SUPER_ADMIN),
  ownership('course', 'instructorId', 'courseId'),
  LessonController.reorderLessons,
);

router.patch(
  '/:id',
  auth(UserRole.INSTRUCTOR, UserRole.ADMIN, UserRole.SUPER_ADMIN),
  validationData(UpdateLessonValidationSchema),
  LessonController.updateLesson,
);

router.delete(
  '/:id',
  auth(UserRole.INSTRUCTOR, UserRole.ADMIN, UserRole.SUPER_ADMIN),
  LessonController.deleteLesson,
);

export const LessonRouter = router;
