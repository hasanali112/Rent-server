import { Router } from 'express';
import { AnalyticsController } from './analytics.controller';
import auth from '../../middleware/auth';
import { UserRole } from '@prisma/client';

const router = Router();

router.get(
  '/overview',
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  AnalyticsController.getSystemOverview,
);

router.get(
  '/revenue/courses',
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  AnalyticsController.getRevenuePerCourse,
);

router.get(
  '/instructors/performance',
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  AnalyticsController.getInstructorPerformance,
);

router.get(
  '/operational',
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  AnalyticsController.getOperationalStats,
);

export const AnalyticsRouter = router;
