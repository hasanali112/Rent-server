import { NextFunction, Request, Response } from 'express';
import { UserRole } from '@prisma/client';
import config from '../config';
import { JWTHelper } from '../utils/JwtHelper';
import catchAsync from '../utils/catchAsync';
import { Secret } from 'jsonwebtoken';

const auth = (...roles: UserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new Error('You are not authorized');
    }

    let verifiedUser = null;

    try {
      verifiedUser = JWTHelper.verifyToken(
        token,
        config.JWT.JWT_ACCESS_SECRET as string,
      );
    } catch (error) {
      throw new Error('Forbidden');
    }

    req.user = verifiedUser;

    if (roles.length && !roles.includes(verifiedUser.role)) {
      throw new Error('Forbidden');
    }

    next();
  });
};

export default auth;
