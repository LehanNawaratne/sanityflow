import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { HTTP_STATUS } from '../constants/index.js';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  // Zod validation errors → 400
  if (err instanceof ZodError) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      error: 'Validation failed',
      details: err.errors.map(e => ({ field: e.path.join('.'), message: e.message }))
    });
  }

  console.error(err.stack);
  res.status((err as any).status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    error: err.message || 'Internal Server Error'
  });
};

export default errorHandler;
