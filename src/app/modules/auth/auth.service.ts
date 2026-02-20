/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import config from '../../config';
import { JWTHelper } from '../../utils/JwtHelper';
import { TLogin } from './auth.interface';
import { Hashing } from '../../utils/hashing';
import { UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';
import path from 'path';
import { Worker } from 'worker_threads';
import { AuthRepository } from '../../data-access/auth';

function removeUndefined<T extends object>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== undefined),
  ) as Partial<T>;
}

const login = async (payload: TLogin) => {
  const isUserExist = await AuthRepository.findUserByEmailOrContact({
    email: payload.email,
    contactNumber: payload.contactNumber,
  });

  // ✅ Google login flow
  if (payload.provider === 'google') {
    if (!isUserExist) {
      const userData = {
        ...removeUndefined({
          email: payload.email,
          contactNumber: payload.contactNumber,
        }),
        role: UserRole.STUDENT,
      };

      const customerData = removeUndefined({
        name: payload.name,
        email: payload.email,
        contactNumber: payload.contactNumber,
        profilePhoto: payload.profilePhoto,
      });

      const user = await AuthRepository.createGoogleUserWithCustomer(
        userData,
        customerData,
      );

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

//password has
// const testAuthPerformance = async () => {
//   const password = "super-secret-password";
//   const start = Date.now();

//   // আমরা একসাথে ১০টি হ্যাশ জেনারেট করার চেষ্টা করবো
//   const tasks = [];
//   for (let i = 0; i < 100; i++) {
//     tasks.push(bcrypt.hash(password, 12)); // এটি Libuv থ্রেড পুলে যায়
//   }

//   await Promise.all(tasks);
//   console.log(`Total time for 10 hashes: ${Date.now() - start}ms`);
// };

const testAuthPerformance = async () => {
  return new Promise((resolve, reject) => {
    // ওয়ার্কার ফাইলটি কল করছি
    const worker = new Worker(path.join(__dirname, 'auth.worker.ts'), {
      workerData: { password: 'super-secret-password' },
    });

    worker.on('message', data => {
      console.log('Hashing done in separate thread!');
      resolve(data);
    });

    worker.on('error', reject);
  });
};

export const AuthService = {
  login,
  testAuthPerformance,
};
