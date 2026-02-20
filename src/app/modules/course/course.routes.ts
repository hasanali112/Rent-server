import { Router } from 'express';
import { CourseController } from './course.controller';
import auth from '../../middleware/auth';
import ownership from '../../middleware/ownership';
import { UserRole } from '@prisma/client';
import validationData from '../../utils/validationData';
import {
  CreateCourseValidationSchema,
  UpdateCourseValidationSchema,
} from './dto/course.dto';

const router = Router();

router.get('/', CourseController.getAllCourses);

router.post(
  '/',
  auth(UserRole.INSTRUCTOR, UserRole.ADMIN, UserRole.SUPER_ADMIN),
  validationData(CreateCourseValidationSchema),
  CourseController.createCourse,
);

router.get(
  '/my-courses',
  auth(UserRole.INSTRUCTOR, UserRole.ADMIN, UserRole.SUPER_ADMIN),
  CourseController.getMyCourses,
);

router.get(
  '/analytics',
  auth(UserRole.INSTRUCTOR, UserRole.ADMIN, UserRole.SUPER_ADMIN),
  CourseController.getInstructorAnalytics,
);

router.patch(
  '/:id',
  auth(UserRole.INSTRUCTOR, UserRole.ADMIN, UserRole.SUPER_ADMIN),
  ownership('course', 'instructorId'),
  validationData(UpdateCourseValidationSchema),
  CourseController.updateCourse,
);

router.patch(
  '/:id/status',
  auth(UserRole.INSTRUCTOR, UserRole.ADMIN, UserRole.SUPER_ADMIN),
  ownership('course', 'instructorId'),
  CourseController.updateCourseStatus,
);

router.delete(
  '/:id',
  auth(UserRole.INSTRUCTOR, UserRole.ADMIN, UserRole.SUPER_ADMIN),
  ownership('course', 'instructorId'),
  CourseController.deleteCourse,
);

export const CourseRouter = router;
