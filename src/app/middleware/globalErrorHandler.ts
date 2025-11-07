/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import {
  PrismaClientValidationError,
  PrismaClientKnownRequestError,
} from '@prisma/client/runtime/library';

const globalErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = httpStatus.INTERNAL_SERVER_ERROR;
  const success = false;
  let message = 'Something went wrong!';

  const isProd = process.env.NODE_ENV === 'production';
  let error: unknown = isProd ? null : undefined;

  if (err instanceof PrismaClientValidationError) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = 'Validation error';
    error = isProd ? null : err.message;
  } else if (err instanceof PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002':
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        message = 'Unique constraint violation';
        error = isProd
          ? { code: 'P2002' }
          : { code: 'P2002', target: (err.meta as any)?.target };
        break;
      case 'P2025':
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        message = 'Record not found';
        error = isProd ? { code: 'P2025' } : { code: 'P2025', meta: err.meta };
        break;
      default:
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        message = 'Database request error';
        error = isProd
          ? { code: err.code }
          : { code: err.code, meta: err.meta };
    }
  } else if (err instanceof Error) {
    message = err.message || message;
    error = isProd
      ? null
      : {
          name: err.name,
          message: err.message,
          stack: err.stack,
        };
  }

  res.status(statusCode).json({
    success,
    message,
    error,
  });
};

export default globalErrorHandler;
