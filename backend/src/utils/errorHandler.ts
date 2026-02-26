import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { HTTP_STATUS } from '../constants/index.js';

export class AppError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = 'AppError';
  }
}

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  // Zod validation errors → 400
  if (err instanceof ZodError) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      error: 'Validation failed',
      details: err.issues.map((e) => ({ field: e.path.join('.'), message: e.message }))
    });
  }

  // Mongoose CastError (invalid ObjectId) → 400
  if ((err as any).name === 'CastError' && (err as any).kind === 'ObjectId') {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'Invalid ID format' });
  }

  console.error(err.stack);
  res.status((err as any).status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    error: err.message || 'Internal Server Error'
  });
};

export default errorHandler;
