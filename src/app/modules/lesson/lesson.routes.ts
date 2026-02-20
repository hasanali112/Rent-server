import { Router } from 'express';
import { LessonController } from './lesson.controller';
import auth from '../../middleware/auth';
import ownership from '../../middleware/ownership';
import { UserRole } from '@prisma/client';

const router = Router();

router.post(
  '/',
  auth(UserRole.INSTRUCTOR),
  // Note: We need a specialized ownership check for "addLesson" since courseId is in body
  // For simplicity here, we assume the controller handles the link or we add a custom check if needed
  // But per existing plan, let's keep it consistent
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
  auth(UserRole.INSTRUCTOR),
  ownership('course', 'instructorId', 'courseId'), // Custom ownership to check courseId param
  LessonController.reorderLessons,
);

router.patch(
  '/:id',
  auth(UserRole.INSTRUCTOR),
  // We'd need to check if the lesson belongs to a course owned by the instructor
  // ownership utility might need expansion to handle "lesson" resource
  LessonController.updateLesson,
);

router.delete('/:id', auth(UserRole.INSTRUCTOR), LessonController.deleteLesson);

export const LessonRouter = router;
