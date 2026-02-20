import { Request, Response, NextFunction } from 'express';

const logger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const method = req.method;
    const url = req.originalUrl || req.url;
    const status = res.statusCode;

    // NestJS-like colors
    const green = '\x1b[32m';
    const yellow = '\x1b[33m';
    const red = '\x1b[31m';
    const blue = '\x1b[34m';
    const reset = '\x1b[0m';

    let color = green;
    if (status >= 500) {
      color = red;
    } else if (status >= 400) {
      color = yellow;
    } else if (status >= 300) {
      color = blue;
    }

    const timestamp = new Date().toLocaleString();
    const pid = process.pid;

    console.log(
      `${green}[LMS] ${pid}  -${reset} ${timestamp}     ${green}LOG${reset} ${yellow}[Request]${reset} ${method} ${url} ${color}${status}${reset} ${yellow}+${duration}ms${reset}`,
    );
  });

  next();
};

export default logger;
