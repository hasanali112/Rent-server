import { Router } from 'express';
import { NotificationController } from './notification.controller';
import auth from '../../middleware/auth';
import { UserRole } from '@prisma/client';

const router = Router();

router.get(
  '/',
  auth(
    UserRole.STUDENT,
    UserRole.INSTRUCTOR,
    UserRole.ADMIN,
    UserRole.SUPER_ADMIN,
  ),
  NotificationController.getMyNotifications,
);

router.patch(
  '/:id/read',
  auth(
    UserRole.STUDENT,
    UserRole.INSTRUCTOR,
    UserRole.ADMIN,
    UserRole.SUPER_ADMIN,
  ),
  NotificationController.markAsRead,
);

export const NotificationRouter = router;
