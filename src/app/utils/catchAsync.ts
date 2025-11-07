import { NextFunction, Request, RequestHandler, Response } from 'express';

const catchAsync = (fn: RequestHandler) => {
  return function (req: Request, res: Response, next: NextFunction) {
    new Promise(resolve => resolve(fn(req, res, next))).catch(err => next(err));
  };
};

export default catchAsync;
