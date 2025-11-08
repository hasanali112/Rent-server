import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { TLogin } from './auth.interface';
import { AuthService } from './auth.service';

const login = catchAsync(async (req, res) => {
  const payload: TLogin = req.body;
  const result = await AuthService.login(payload);
  const { refreshToken, accessToken } = result;
  res.cookie('UserSeassionID', refreshToken, {
    secure: false,
    httpOnly: true,
  });
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User logged in successfully',
    data: {
      accessToken,
    },
  });
});

export const AuthController = {
  login,
};
