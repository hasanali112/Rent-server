import { HouseRent } from '../../../../prisma/generated/client';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { HouseRentService } from './houseRent.service';
import httpStatus from 'http-status';

//create houseRent
const createHouseRent = catchAsync(async (req, res) => {
  const result = await HouseRentService.createHouseRent(req.body as HouseRent);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'House rent created successfully',
    data: result,
  });
});

//get all houseRent
const getAllHouseRent = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const result = await HouseRentService.getAllHouseRent(page, limit);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'House rent fetched successfully',
    data: result.data,
    meta: result.meta,
  });
});

//update houseRent
const updateHouseRent = catchAsync(async (req, res) => {
  const payload = req.body as Partial<HouseRent>;
  const result = await HouseRentService.updateHouseRent(req.params.id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'House rent updated successfully',
    data: result,
  });
});

//delete houseRent
const deleteHouseRent = catchAsync(async (req, res) => {
  const result = await HouseRentService.deleteHouseRent(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'House rent deleted successfully',
    data: result,
  });
});

export const HouseRentController = {
  createHouseRent,
  getAllHouseRent,
  updateHouseRent,
  deleteHouseRent,
};
