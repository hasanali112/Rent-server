/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import type { Server } from 'http';
import app from './app';
import config from './app/config';

const PORT = process.env.PORT || config.PORT;

let server: Server;

function main() {
  try {
    server = app.listen(PORT, () => {
      console.log(`Easy Search Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

process.on('unhandledRejection', (error: any) => {
  if (server) {
    server.close(() => {
      console.error(`Unhandled Rejection at: ${error}`);
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

process.on('uncaughtException', () => {
  if (server) {
    server.close(() => {
      console.error(`Uncaught Exception`);
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});
