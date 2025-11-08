import { UserRole } from './user.constant';
import { TUser } from './user.interface';
import prisma from '../../utils/prisma';
import { Hashing } from '../../utils/hashing';
import config from '../../config';
import { JWTHelper } from '../../utils/JwtHelper';

//create admin
const createAdmin = async (payload: TUser) => {
  const hashedPassword = await Hashing.hashPassword(payload.password);
  const userData = {
    ...(payload.email && { email: payload.email }),
    ...(payload.contactNumber && { contactNumber: payload.contactNumber }),
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  const AdminData = {
    name: payload.name,
    ...(payload.email && { email: payload.email }),
    ...(payload.contactNumber && { contactNumber: payload.contactNumber }),
  };
  const user = await prisma.$transaction(async transactionClient => {
    const createdUser = await transactionClient.user.create({
      data: userData,
    });
    const admin = await transactionClient.admin.create({
      data: {
        ...AdminData,
        userId: createdUser.id,
      },
    });
    return admin;
  });

  return user;
};

//Register user
const resgisterUser = async (payload: TUser) => {
  const role =
    payload.role === UserRole.HOST ? UserRole.HOST : UserRole.CUSTOMER;
  const hashedPassword = await Hashing.hashPassword(payload.password);
  const userData = {
    ...(payload.email && { email: payload.email }),
    ...(payload.contactNumber && { contactNumber: payload.contactNumber }),
    password: hashedPassword,
    role: role,
  };

  const cutomerData = {
    name: payload.name,
    ...(payload.email && { email: payload.email }),
    ...(payload.contactNumber && { contactNumber: payload.contactNumber }),
    ...(payload.profilePhoto && { profilePhoto: payload.profilePhoto }),
  };

  const user = await prisma.$transaction(async transactionClient => {
    const createdUser = await transactionClient.user.create({
      data: userData,
    });

    if (payload.role === UserRole.HOST) {
      await transactionClient.host.create({
        data: {
          ...cutomerData,
          userId: createdUser.id,
        },
      });
    } else {
      await transactionClient.admin.create({
        data: {
          ...cutomerData,
          userId: createdUser.id,
        },
      });
    }

    return createdUser;
  });

  const jwtpayload = {
    id: user.id,
    role: user.role,
  };

  const accessToken = JWTHelper.generateToken(
    jwtpayload,
    config.JWT.JWT_ACCESS_SECRET as string,
    config.JWT.JWT_ACCESS_EXPIRES_IN as string,
  );

  const refreshToken = JWTHelper.generateToken(
    jwtpayload,
    config.JWT.JWT_REFRESH_SECRET as string,
    config.JWT.JWT_REFRESH_EXPIRES_IN as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const UserService = {
  createAdmin,
  resgisterUser,
};
