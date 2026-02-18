import type { Request, Response } from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { HTTP_STATUS, JWT_EXPIRES_IN } from '../constants/index.js';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: JWT_EXPIRES_IN });
    res.status(HTTP_STATUS.CREATED).json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ error: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: JWT_EXPIRES_IN });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ error: (error as Error).message });
  }
};
