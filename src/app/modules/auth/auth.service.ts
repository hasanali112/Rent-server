/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserRole } from '../../../generated/prisma/enums';
import config from '../../config';
import { JWTHelper } from '../../utils/JwtHelper';
import prisma from '../../utils/prisma';
import { TLogin } from './auth.interface';
import { Hashing } from '../../utils/hashing';

function removeUndefined<T extends object>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== undefined),
  ) as Partial<T>;
}

const login = async (payload: TLogin) => {
  const isUserExist = await prisma.user.findFirst({
    where: {
      OR: [
        { email: payload.email ?? undefined },
        { contactNumber: payload.contactNumber ?? undefined },
      ],
    },
  });

  // ✅ Google login flow
  if (payload.provider === 'google') {
    if (!isUserExist) {
      const userData = {
        ...removeUndefined({
          email: payload.email,
          contactNumber: payload.contactNumber,
        }),
        role: UserRole.CUSTOMER,
      };

      const customerData = removeUndefined({
        name: payload.name,
        email: payload.email,
        contactNumber: payload.contactNumber,
        profilePhoto: payload.profilePhoto,
      });

      const user = await prisma.$transaction(async tx => {
        const createdUser = await tx.user.create({
          data: userData,
        });

        if (Object.keys(customerData).length > 0) {
          await tx.customer.create({
            data: {
              ...customerData,
              userId: createdUser.id,
            },
          });
        }

        return createdUser;
      });

      const jwtPayload = {
        id: user.id,
        role: user.role,
      };

      const accessToken = JWTHelper.generateToken(
        jwtPayload,
        config.JWT.JWT_ACCESS_SECRET!,
        config.JWT.JWT_ACCESS_EXPIRES_IN!,
      );

      const refreshToken = JWTHelper.generateToken(
        jwtPayload,
        config.JWT.JWT_REFRESH_SECRET!,
        config.JWT.JWT_REFRESH_EXPIRES_IN!,
      );

      return { accessToken, refreshToken };
    }

    // already exists → return tokens directly
    const jwtPayload = {
      id: isUserExist.id,
      role: isUserExist.role,
    };

    const accessToken = JWTHelper.generateToken(
      jwtPayload,
      config.JWT.JWT_ACCESS_SECRET!,
      config.JWT.JWT_ACCESS_EXPIRES_IN!,
    );

    const refreshToken = JWTHelper.generateToken(
      jwtPayload,
      config.JWT.JWT_REFRESH_SECRET!,
      config.JWT.JWT_REFRESH_EXPIRES_IN!,
    );

    return { accessToken, refreshToken };
  }

  if (!isUserExist) {
    throw new Error('User not found');
  }

  const hashedPassword = isUserExist.password;

  if (!payload.password || !hashedPassword) {
    throw new Error('Password is missing');
  }

  const checkPassword = await Hashing.comparePassword(
    payload.password,
    hashedPassword,
  );

  if (!checkPassword) {
    throw new Error('Invalid password');
  }

  const jwtPayload = {
    id: isUserExist.id,
    role: isUserExist.role,
  };

  const accessToken = JWTHelper.generateToken(
    jwtPayload,
    config.JWT.JWT_ACCESS_SECRET!,
    config.JWT.JWT_ACCESS_EXPIRES_IN!,
  );

  const refreshToken = JWTHelper.generateToken(
    jwtPayload,
    config.JWT.JWT_REFRESH_SECRET!,
    config.JWT.JWT_REFRESH_EXPIRES_IN!,
  );

  return { accessToken, refreshToken };
};

export const AuthService = {
  login,
};
