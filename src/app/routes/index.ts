import { Router } from 'express';
import { UserRouter } from '../modules/user/user.routes';
import { AuthRouter } from '../modules/auth/auth.routes';
import { CategoryRouter } from '../modules/category/category.routes';
import { HouseRentRouter } from '../modules/houseRent/houseRent.routes';
import { HostelRentRouter } from '../modules/hostelRent/hostelRent.routes';

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
  {
    path: '/house-rent',
    router: HouseRentRouter,
  },
  {
    path: '/hostel-rent',
    router: HostelRentRouter,
  },
];

Routes.forEach(rt => {
  middlewareRouter.use(rt.path, rt.router);
});

export default middlewareRouter;
