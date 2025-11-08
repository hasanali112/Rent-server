import { Router } from 'express';
import { UserRouter } from '../modules/user/user.routes';

const middlewareRouter = Router();

const Routes = [
  {
    path: '/users',
    router: UserRouter,
  },
];

Routes.forEach(rt => {
  middlewareRouter.use(rt.path, rt.router);
});

export default middlewareRouter;
