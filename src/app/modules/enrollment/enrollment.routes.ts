import { Router } from 'express';
import { EnrollmentController } from './enrollment.controller';
import auth from '../../middleware/auth';
import { UserRole } from '@prisma/client';
import ownership from '../../middleware/ownership';
import validationData from '../../utils/validationData';
import { EnrollInCourseValidationSchema } from './dto/enroll.dto';

const router = Router();

router.post(
  '/enroll',
  auth(UserRole.STUDENT),
  validationData(EnrollInCourseValidationSchema),
  EnrollmentController.enrollInCourse,
);

router.get(
  '/my-courses',
  auth(UserRole.STUDENT),
  EnrollmentController.getMyEnrolledCourses,
);

router.patch(
  '/drop/:id',
  auth(UserRole.STUDENT, UserRole.ADMIN, UserRole.SUPER_ADMIN),
  ownership('enrollment', 'studentId'),
  EnrollmentController.dropCourse,
);

router.patch(
  '/complete/:id',
  auth(UserRole.STUDENT, UserRole.ADMIN, UserRole.SUPER_ADMIN),
  ownership('enrollment', 'studentId'),
  EnrollmentController.completeCourse,
);

export const EnrollmentRouter = router;
