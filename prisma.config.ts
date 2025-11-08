import { defineConfig, env } from 'prisma/config';
import config from './src/app/config/index';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  engine: 'classic',
  datasource: {
    url: config.DATABASE_URL as string,
  },
});
