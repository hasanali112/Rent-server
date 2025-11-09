/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TUser } from './user.interface';
import { UserService } from './user.service';
import httpStatus from 'http-status';

//create adming
const CreateUserIntoDB = catchAsync(async (req, res) => {
  const payload: TUser = req.body;
  const result = await UserService.createAdmin(payload);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Admin created successfully',
    data: result,
  });
});

//host/customer registration
const registration = catchAsync(async (req, res) => {
  const payload: TUser = req.body;
  const result = await UserService.resgisterUser(payload);
  const { refreshToken, accessToken } = result;
  res.cookie('UserSeassionID', refreshToken, {
    secure: false,
    httpOnly: true,
  });
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User created successfully',
    data: {
      accessToken: accessToken,
    },
  });
});

export const UserController = {
  CreateUserIntoDB,
  registration,
};
