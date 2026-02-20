/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import catchAsync from './catchAsync';
import { swaggerRegistry } from './swaggerRegistry';

type TControllerFn = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<any>;

interface TControllerConfig {
  handler: TControllerFn;
  path?: string;
  method?: string;
  doc?: {
    tags: string[];
    summary: string;
    description?: string;
    requestBody?: any;
    parameters?: any[];
    responses: Record<number, { description: string; content?: any }>;
  };
}

/**
 * Creates a controller with attached Swagger documentation.
 * Allows defining documentation directly in the controller object.
 */
export const createController = (config: TControllerConfig) => {
  if (config.path && config.method && config.doc) {
    swaggerRegistry.registerPath(config.path, config.method, config.doc);
  }
  return catchAsync(config.handler);
};
