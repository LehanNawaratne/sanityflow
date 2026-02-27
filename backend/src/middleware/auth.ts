import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/errorHandler.js';
import env from '../config/env.js';
import type { JWTPayload, UserRole } from '../types/index.js';

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) throw new AppError(401, 'Please authenticate');

    const decoded = jwt.verify(token, env.JWT_SECRET) as JWTPayload;
    req.user = { userId: decoded.userId, role: decoded.role };
    next();
  } catch (error) {
    next(error instanceof AppError ? error : new AppError(401, 'Please authenticate'));
  }
};

export const requireRole = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError(403, 'Forbidden'));
    }
    next();
  };
};

export default auth;
