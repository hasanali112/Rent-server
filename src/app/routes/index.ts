import { Router } from 'express';
import { UserRouter } from '../modules/user';
import { AuthRouter } from '../modules/auth';
import { AdminRouter } from '../modules/admin';
import { CategoryRouter } from '../modules/category';
import { CourseRouter } from '../modules/course';
import { LessonRouter } from '../modules/lesson';
import { InstructorRouter } from '../modules/user';

const middlewareRouter = Router();

const Routes = [
  {
    path: '/users',
    router: UserRouter,
  },
  {
    path: '/auth',
    router: AuthRouter,
  },
  {
    path: '/admin',
    router: AdminRouter,
  },
  {
    path: '/categories',
    router: CategoryRouter,
  },
  {
    path: '/courses',
    router: CourseRouter,
  },
  {
    path: '/lessons',
    router: LessonRouter,
  },
  {
    path: '/instructor',
    router: InstructorRouter,
  },
];

Routes.forEach(rt => {
  middlewareRouter.use(rt.path, rt.router);
});

export default middlewareRouter;
