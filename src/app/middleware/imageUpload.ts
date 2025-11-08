/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import { imagekit } from '../utils/imagekit';
import catchAsync from '../utils/catchAsync';

interface UploadRequest extends Request {
  uploadedImages?: {
    url: string;
    fileId: string;
    name: string;
    fieldName: string;
  }[];
}

const createImageUploadMiddleware = (fieldNames: string | string[]) => {
  return catchAsync(
    async (req: UploadRequest, res: Response, next: NextFunction) => {
      const { folder } = req.body;
      const fields = Array.isArray(fieldNames) ? fieldNames : [fieldNames];
      const uploadedImages: any[] = [];

      for (const fieldName of fields) {
        const files = req.body[fieldName];

        if (!files) continue;

        const fileArray = Array.isArray(files) ? files : [files];

        for (const file of fileArray) {
          if (file) {
            const response = await imagekit.upload({
              file,
              fileName: `${fieldName}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
              folder: folder || 'uploads',
            });

            uploadedImages.push({
              url: response.url,
              fileId: response.fileId,
              name: response.name,
              fieldName,
            });
          }
        }
      }

      req.uploadedImages = uploadedImages;
      next();
    },
  );
};

export { createImageUploadMiddleware };
