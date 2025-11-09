import { HouseRent } from '../../../../prisma/generated/client';
import prisma from '../../utils/prisma';
import { filterValidData } from '../../utils/filterValidData';
import { getPaginationData, getPaginationMeta } from '../../utils/pagination';

//create houseRent
const createHouseRent = async (payload: HouseRent) => {
  const houseRent = await prisma.houseRent.create({
    data: payload,
  });

  return houseRent;
};

//get all houseRent
const getAllHouseRent = async (page: number = 1, limit: number = 10) => {
  const { skip, take } = getPaginationData(page, limit);
  const houseRents = await prisma.houseRent.findMany({
    skip,
    take,
    include: {
      category: true,
      owner: true,
    },
  });
  const total = await prisma.houseRent.count();

  return {
    data: houseRents,
    meta: getPaginationMeta(page, limit, total),
  };
};

//update houseRent
const updateHouseRent = async (id: string, payload: Partial<HouseRent>) => {
  const filteredData = filterValidData(payload);

  const houseRent = await prisma.houseRent.update({
    where: { id },
    data: filteredData,
  });

  return houseRent;
};

//delete houseRent
const deleteHouseRent = async (id: string) => {
  const houseRent = await prisma.houseRent.delete({
    where: { id },
  });

  return houseRent;
};

export const HouseRentService = {
  createHouseRent,
  getAllHouseRent,
  updateHouseRent,
  deleteHouseRent,
};
