import prisma from '../../utils/prisma';
import { UserRole } from '@prisma/client';

type UserCreateData = {
  email?: string;
  contactNumber?: string;
  password: string;
  role: UserRole;
};

type AdminCreateData = {
  name: string;
  email?: string;
  contactNumber?: string;
};

type ProfileCreateData = {
  name: string;
  email?: string;
  contactNumber?: string;
  profilePhoto?: string;
};

type ProfileType = 'HOST' | 'CUSTOMER';

const createAdminWithUser = async (userData: UserCreateData) => {
  const result = await prisma.user.create({
    data: {
      ...userData,
      role: 'ADMIN',
    },
  });
  return result;
};

const createUserWithProfile = async (userData: UserCreateData) => {
  const result = await prisma.user.create({
    data: userData,
  });
  return result;
};

const updateUserStatus = async (id: string, status: 'ACTIVE' | 'BLOCKED') => {
  const result = await prisma.user.update({
    where: { id },
    data: { status },
  });
  return result;
};

const getAllUsers = async () => {
  const result = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return result;
};

export const UserRepository = {
  createAdminWithUser,
  createUserWithProfile,
  updateUserStatus,
  getAllUsers,
};
