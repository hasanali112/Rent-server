import { HostelRent } from '../../../../prisma/generated/client';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { HostelRentService } from './hostelRent.service';
import httpStatus from 'http-status';

//create hostelRent
const createHostelRent = catchAsync(async (req, res) => {
  const result = await HostelRentService.createHostelRent(req.body as HostelRent);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Hostel rent created successfully',
    data: result,
  });
});

//get all hostelRent
const getAllHostelRent = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const result = await HostelRentService.getAllHostelRent(page, limit);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Hostel rent fetched successfully',
    data: result.data,
    meta: result.meta,
  });
});

//update hostelRent
const updateHostelRent = catchAsync(async (req, res) => {
  const result = await HostelRentService.updateHostelRent(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Hostel rent updated successfully',
    data: result,
  });
});

//delete hostelRent
const deleteHostelRent = catchAsync(async (req, res) => {
  const result = await HostelRentService.deleteHostelRent(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Hostel rent deleted successfully',
    data: result,
  });
});

export const HostelRentController = {
  createHostelRent,
  getAllHostelRent,
  updateHostelRent,
  deleteHostelRent,
};
