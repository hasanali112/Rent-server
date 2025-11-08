import dotenv from 'dotenv';

dotenv.config();

export default {
  Node_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT: {
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,
  },
};
