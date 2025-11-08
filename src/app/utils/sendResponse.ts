import { Response } from 'express';

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data?: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  const responseData = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message,
    meta: data.meta,
    data: data.data,
  };
  res.status(data.statusCode).json(responseData);
};

export default sendResponse;
