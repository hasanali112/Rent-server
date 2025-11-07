import dotenv from 'dotenv';

dotenv.config();

export default {
  Node_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
};
