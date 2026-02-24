import type { Request, Response, NextFunction } from 'express';
import WaterQualityTest from '../models/WaterQualityTest.js';
import { createWaterTestSchema, updateWaterTestSchema } from '../types/issueSchemas.js';
import { HTTP_STATUS } from '../constants/index.js';

// Create a new water quality test
export const createWaterTest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate input
    const validatedData = createWaterTestSchema.parse(req.body);

    // Create test
    const test = new WaterQualityTest({
      ...validatedData,
      tester: (req as any).userId
    });

    await test.save();
    res.status(HTTP_STATUS.CREATED).json(test);
  } catch (error) {
    next(error);
  }
};

// Get all water quality tests
export const getWaterTests = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tests = await WaterQualityTest.find().populate('tester', 'name email');
    res.json(tests);
  } catch (error) {
    next(error);
  }
};

// Update a water quality test
export const updateWaterTest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const validatedData = updateWaterTestSchema.parse(req.body);

    const test = await WaterQualityTest.findByIdAndUpdate(id, validatedData, { new: true });
    if (!test) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Water quality test not found' });
    }

    res.json(test);
  } catch (error) {
    next(error);
  }
};

// Delete a water quality test
export const deleteWaterTest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const test = await WaterQualityTest.findByIdAndDelete(id);
    if (!test) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Water quality test not found' });
    }

    res.json({ message: 'Water quality test deleted successfully' });
  } catch (error) {
    next(error);
  }
};