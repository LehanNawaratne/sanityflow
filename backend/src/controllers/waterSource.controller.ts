import type { Request, Response, NextFunction } from 'express';
import {
  createWaterSourceService,
  getAllWaterSourcesService,
  getWaterSourceByIdService,
  updateWaterSourceService,
  deleteWaterSourceService
} from '../services/waterSource.service.js';
import { HTTP_STATUS } from '../constants/index.js';

export const createWaterSourceController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const source = await createWaterSourceService(req.body);
    res.status(HTTP_STATUS.CREATED).json(source);
  } catch (error) {
    next(error);
  }
};

export const getAllWaterSourcesController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { condition, type, isActive } = req.query as {
      condition?: string;
      type?: string;
      isActive?: string;
    };
    const filters: { condition?: string; type?: string; isActive?: string } = {};
    if (condition !== undefined) filters.condition = condition;
    if (type !== undefined) filters.type = type;
    if (isActive !== undefined) filters.isActive = isActive;
    const sources = await getAllWaterSourcesService(filters);
    res.json(sources);
  } catch (error) {
    next(error);
  }
};

export const getWaterSourceByIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { source, weather } = await getWaterSourceByIdService(req.params.id as string);
    res.json({ ...source.toObject(), weather });
  } catch (error) {
    next(error);
  }
};

export const updateWaterSourceController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const source = await updateWaterSourceService(req.params.id as string, req.body);
    res.json(source);
  } catch (error) {
    next(error);
  }
};

export const deleteWaterSourceController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteWaterSourceService(req.params.id as string);
    res.json({ message: 'Water source deleted successfully' });
  } catch (error) {
    next(error);
  }
};
