import { Router } from 'express';
import { AdminController } from './admin.controller';
import auth from '../../middleware/auth';
import { UserRole } from '@prisma/client';

const router = Router();

router.get(
  '/analytics',
  auth(UserRole.SUPER_ADMIN),
  AdminController.getGlobalAnalytics,
);

router.patch(
  '/courses/:id/status',
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  AdminController.overrideCourseStatus,
);

router.get(
  '/courses',
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  AdminController.getAllCourses,
);

router.get(
  '/operational-analytics',
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  AdminController.getOperationalAnalytics,
);

router.put(
  '/config',
  auth(UserRole.SUPER_ADMIN),
  AdminController.updatePlatformConfig,
);

export const AdminRouter = router;
