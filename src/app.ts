import express, { type Application } from 'express';
import cors from 'cors';
import { notFoundRoutes } from './app/middleware/notFoundRoutes';
import globalErrorHandler from './app/middleware/globalErrorHandler';

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

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
