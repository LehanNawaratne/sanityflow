import type { Request, Response, NextFunction } from 'express';
import {
  createWaterSourceService,
  getAllWaterSourcesService,
  getWaterSourceByIdService,
  updateWaterSourceService,
  deleteWaterSourceService
} from '../services/waterSource.service.js';
import { HTTP_STATUS } from '../constants/HTTP_STATUS.js';

// POST /api/v1/water-sources
export const createWaterSourceController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const source = await createWaterSourceService(req.body);
    res.status(HTTP_STATUS.CREATED).json(source);
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/water-sources
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

// GET /api/v1/water-sources/:id
export const getWaterSourceByIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const source = await getWaterSourceByIdService(req.params.id as string);
    res.json(source);
  } catch (error) {
    next(error);
  }
};

// PUT /api/v1/water-sources/:id
export const updateWaterSourceController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const source = await updateWaterSourceService(req.params.id as string, req.body);
    res.json(source);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/v1/water-sources/:id
export const deleteWaterSourceController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteWaterSourceService(req.params.id as string);
    res.json({ message: 'Water source deleted successfully' });
  } catch (error) {
    next(error);
  }
};
