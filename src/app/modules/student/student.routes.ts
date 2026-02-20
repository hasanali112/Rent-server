import { Router } from 'express';
import { StudentController } from './student.controller';
import auth from '../../middleware/auth';
import { UserRole } from '@prisma/client';

const router = Router();

router.post(
  '/lessons/:lessonId/complete',
  auth(UserRole.STUDENT),
  StudentController.markLessonComplete,
);

router.get(
  '/courses/:courseId/content',
  auth(UserRole.STUDENT),
  StudentController.getCourseContent,
);

export const StudentRouter = router;
