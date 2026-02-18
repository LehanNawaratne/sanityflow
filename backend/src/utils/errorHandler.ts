import type { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS } from '../constants/index.js';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status((err as any).status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    error: err.message || 'Internal Server Error'
  });
};

export default errorHandler;
