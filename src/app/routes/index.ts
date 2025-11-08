import { Router } from 'express';
import { UserRouter } from '../modules/user/user.routes';
import { AuthRouter } from '../modules/auth/auth.routes';
import { CategoryRouter } from '../modules/category/category.routes';

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
    path: '/categories',
    router: CategoryRouter,
  },
];

Routes.forEach(rt => {
  middlewareRouter.use(rt.path, rt.router);
});

export default middlewareRouter;
