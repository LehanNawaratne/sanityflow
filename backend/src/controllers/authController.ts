import type { Request, Response, NextFunction } from 'express';
import { registerUser, loginUser } from '../services/auth.service.js';
import { HTTP_STATUS } from '../constants/HTTP_STATUS.js';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await registerUser(req.body);
    res.status(HTTP_STATUS.CREATED).json(result);
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await loginUser(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
