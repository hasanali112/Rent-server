/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

export const notFoundRoutes = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  return res.status(httpStatus.NOT_FOUND).json({
    statusCode: httpStatus.NOT_FOUND,
    success: false,
    message: 'Route not found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'Route not found',
      },
    ],
  });
};
