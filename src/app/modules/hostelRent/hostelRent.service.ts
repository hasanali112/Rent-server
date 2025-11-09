import { HostelRent } from '../../../../prisma/generated/client';
import { AppError } from '../../error/AppError';
import prisma from '../../utils/prisma';
import { filterValidData } from '../../utils/filterValidData';
import { getPaginationData, getPaginationMeta } from '../../utils/pagination';
import httpStatus from 'http-status';

//create hostelRent
const createHostelRent = async (payload: HostelRent) => {
  const hostelRent = await prisma.hostelRent.create({
    data: payload,
  });

  return hostelRent;
};

//get all hostelRent
const getAllHostelRent = async (page: number = 1, limit: number = 10) => {
  const { skip, take } = getPaginationData(page, limit);
  const hostelRents = await prisma.hostelRent.findMany({
    skip,
    take,
    include: {
      category: true,
      owner: true,
    },
  });
  const total = await prisma.hostelRent.count();
  
  return {
    data: hostelRents,
    meta: getPaginationMeta(page, limit, total),
  };
};

//update hostelRent
const updateHostelRent = async (id: string, payload: Partial<HostelRent>) => {
  const filteredData = filterValidData(payload);

  const hostelRent = await prisma.hostelRent.update({
    where: { id },
    data: filteredData,
  });

  return hostelRent;
};

//delete hostelRent
const deleteHostelRent = async (id: string) => {
  const hostelRent = await prisma.hostelRent.delete({
    where: { id },
  });

  return hostelRent;
};

export const HostelRentService = {
  createHostelRent,
  getAllHostelRent,
  updateHostelRent,
  deleteHostelRent,
};
