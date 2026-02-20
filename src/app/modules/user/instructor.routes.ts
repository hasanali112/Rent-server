import { Router } from 'express';
import { InstructorController } from './instructor.controller';
import auth from '../../middleware/auth';
import { UserRole } from '@prisma/client';

const router = Router();

router.get(
  '/students',
  auth(UserRole.INSTRUCTOR),
  InstructorController.getEnrolledStudents,
);

export const InstructorRouter = router;
