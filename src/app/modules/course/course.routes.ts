import { Router } from 'express';
import { CourseController } from './course.controller';
import auth from '../../middleware/auth';
import ownership from '../../middleware/ownership';
import { UserRole } from '@prisma/client';

const router = Router();

router.post('/', auth(UserRole.INSTRUCTOR), CourseController.createCourse);

router.get(
  '/my-courses',
  auth(UserRole.INSTRUCTOR),
  CourseController.getMyCourses,
);

router.get(
  '/analytics',
  auth(UserRole.INSTRUCTOR),
  CourseController.getInstructorAnalytics,
);

router.patch(
  '/:id',
  auth(UserRole.INSTRUCTOR),
  ownership('course', 'instructorId'),
  CourseController.updateCourse,
);

router.delete(
  '/:id',
  auth(UserRole.INSTRUCTOR),
  ownership('course', 'instructorId'),
  CourseController.deleteCourse,
);

export const CourseRouter = router;
