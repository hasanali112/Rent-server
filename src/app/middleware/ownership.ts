import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import prisma from '../utils/prisma';

const ownership = (
  model: any,
  userIdField: string = 'userId',
  paramName: string = 'id',
) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const resourceId = req.params[paramName];
    const userId = req.user.id;

    const resource = await (prisma as any)[model].findUnique({
      where: { id: resourceId },
    });

    if (!resource) {
      throw new Error('Resource not found');
    }

    if (resource[userIdField] !== userId) {
      throw new Error('You do not own this resource');
    }

    next();
  });
};

export default ownership;
