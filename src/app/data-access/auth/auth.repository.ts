import { UserRole } from '@prisma/client';
import prisma from '../../utils/prisma';

type FindUserInput = {
  email?: string;
  contactNumber?: string;
};

type UserCreateData = {
  email?: string;
  contactNumber?: string;
  role: UserRole;
};

type CustomerCreateData = {
  name?: string;
  email?: string;
  contactNumber?: string;
  profilePhoto?: string;
};

const findUserByEmailOrContact = async ({
  email,
  contactNumber,
}: FindUserInput) => {
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { email: email ?? undefined },
        { contactNumber: contactNumber ?? undefined },
      ],
    },
  });

  return user;
};

const createGoogleUserWithCustomer = async (
  userData: UserCreateData,
  customerData: CustomerCreateData,
) => {
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

  return user;
};

export const AuthRepository = {
  findUserByEmailOrContact,
  createGoogleUserWithCustomer,
};
