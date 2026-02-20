import { UserRole } from './user.constant';
import { TUser } from './user.interface';
import { Hashing } from '../../utils/hashing';
import config from '../../config';
import { JWTHelper } from '../../utils/JwtHelper';
import { UserRepository } from '../../data-access/user';
import prisma from '../../utils/prisma';

//create admin
const createAdmin = async (payload: TUser) => {
  const hashedPassword = await Hashing.hashPassword(payload.password);
  const userData = {
    ...(payload.email && { email: payload.email }),
    contactNumber: payload.contactNumber,
    password: hashedPassword,
    role: 'ADMIN',
  };

  const user = await UserRepository.createAdminWithUser(userData as any);

  return user;
};

//Register user
const resgisterUser = async (payload: TUser) => {
  const role =
    payload.role === UserRole.INSTRUCTOR
      ? UserRole.INSTRUCTOR
      : UserRole.STUDENT;
  const hashedPassword = await Hashing.hashPassword(payload.password);
  const userData = {
    ...(payload.email && { email: payload.email }),
    contactNumber: payload.contactNumber,
    password: hashedPassword,
    role: role,
  };

  const user = await UserRepository.createUserWithProfile(userData as any);

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

const suspendUser = async (
  id: string,
  isSuspended: boolean,
  requesterRole: string,
) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new Error('User not found');

  if (user.role === 'SUPER_ADMIN' && requesterRole !== 'SUPER_ADMIN') {
    throw new Error('Forbidden: Admin cannot suspend Super Admin');
  }

  const result = await UserRepository.updateUserStatus(
    id,
    isSuspended ? 'BLOCKED' : 'ACTIVE',
  );
  return result;
};

const getAllUsers = async () => {
  const result = await UserRepository.getAllUsers();
  return result;
};

export const UserService = {
  createAdmin,
  resgisterUser,
  suspendUser,
  getAllUsers,
};
