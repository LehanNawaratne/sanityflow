import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { HTTP_STATUS } from '../constants/index.js';
import type { JWTPayload } from '../types/index.js';

const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) throw new Error();
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
    (req as any).userId = decoded.userId;
    next();
  } catch (error) {
    res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'Please authenticate' });
  }
};

export default auth;
