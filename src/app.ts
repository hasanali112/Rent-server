/* eslint-disable @typescript-eslint/ban-ts-comment */
import express, { type Application } from 'express';
import cors from 'cors';
import path from 'path';
import { notFoundRoutes } from './app/middleware/notFoundRoutes';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import middlewareRouter from './app/routes';
import swaggerUi from 'swagger-ui-express';
//@ts-ignore
import { HealthController } from './app/modules/health/health.controller';
import swaggerDocument from './swagger.config';

import logger from './app/middleware/logger';
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-7', // set `RateLimit` and `RateLimit-Policy` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(logger);
app.use(limiter);

// Serve swagger-ui static files
app.use(
  '/swagger-ui',
  express.static(path.join(__dirname, '../node_modules/swagger-ui-dist')),
);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/v1', middlewareRouter);

app.get('/', HealthController.healthCheck);

app.use(globalErrorHandler);
app.use(notFoundRoutes);

export default app;
