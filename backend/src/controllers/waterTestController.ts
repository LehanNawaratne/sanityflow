import type { Request, Response, NextFunction } from 'express';
import { 
  createWaterTestService, 
  getAllWaterTestsService, 
  updateWaterTestService, 
  deleteWaterTestService 
} from '../services/waterTestService.js';
import { createWaterTestSchema, updateWaterTestSchema } from '../validations/waterTest.validation.js';
import { HTTP_STATUS } from '../constants/index.js';

// Create a new water quality test
export const createWaterTestController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate input
    const validatedData = createWaterTestSchema.parse(req.body);

    // Call service for business logic
    const test = await createWaterTestService(validatedData, (req as any).userId);

    res.status(HTTP_STATUS.CREATED).json(test);
  } catch (error) {
    next(error);
  }
};

// Get all water quality tests
export const getWaterTestsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tests = await getAllWaterTestsService();
    res.json(tests);
  } catch (error) {
    next(error);
  }
};

// Update a water quality test
export const updateWaterTestController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const validatedData = updateWaterTestSchema.parse(req.body);

    const test = await updateWaterTestService(id, validatedData);

    res.json(test);
  } catch (error) {
    next(error);
  }
};

// Delete a water quality test
export const deleteWaterTestController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    await deleteWaterTestService(id);

    res.json({ message: 'Water quality test deleted successfully' });
  } catch (error) {
    next(error);
  }
};