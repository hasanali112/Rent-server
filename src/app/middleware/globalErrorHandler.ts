/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = httpStatus.INTERNAL_SERVER_ERROR;
  const success = false;
  let message = err.message || 'Something went wrong!';
  let error = err;

  if (err) {
    message = 'Validation Error';
    error = err.message;
  }
  // } else if (err:any) {
  //   if (err.code === 'P2002') {
  //     message = 'Duplicate Key error';
  //     error = err.meta;
  //   }
  // }

  res.status(statusCode).json({
    success,
    message,
    error,
  });
};

export default globalErrorHandler;
