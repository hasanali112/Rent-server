/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { type Application } from 'express';
import cors from 'cors';
import { notFoundRoutes } from './app/middleware/notFoundRoutes';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import middlewareRouter from './app/routes';
import swaggerUi from 'swagger-ui-express';
//@ts-ignore
import swaggerDocument from '../docs/swagger.config';

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(
  '/docs',
  swaggerUi.serve as any,
  swaggerUi.setup(swaggerDocument) as any,
);

app.use('/api/v1', middlewareRouter);

app.get('/', (req, res) => {
  res.status(200).json({
    statusCode: 200,
    success: true,
    message: 'Easy Search Server is running successfully!',
  });
});

app.use(globalErrorHandler);
app.use(notFoundRoutes);

export default app;
