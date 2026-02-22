import type { Request, Response } from 'express';
import { z } from 'zod';
import WaterQualityTest from '../models/WaterQualityTest.js';
import { createWaterQualityTestSchema, updateWaterQualityTestSchema } from '../types/index.js';

export const createWaterQualityTest = async (req: Request, res: Response) => {
  try {
    const validatedData = createWaterQualityTestSchema.parse(req.body);
    const newTest = new WaterQualityTest(validatedData);
    await newTest.save();
    res.status(201).json(newTest);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Validation error', errors: error.issues });
    }
    res.status(500).json({ message: 'Error creating water quality test', error });
  }
};

export const getAllWaterQualityTests = async (req: Request, res: Response) => {
  try {
    const tests = await WaterQualityTest.find();
    res.status(200).json(tests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching water quality tests', error });
  }
};

export const getWaterQualityTestById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const test = await WaterQualityTest.findById(id);
    if (!test) {
      return res.status(404).json({ message: 'Water quality test not found' });
    }
    res.status(200).json(test);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching water quality test', error });
  }
};

export const updateWaterQualityTest = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validatedUpdates = updateWaterQualityTestSchema.parse(req.body);
    const updatedTest = await WaterQualityTest.findByIdAndUpdate(id, validatedUpdates, { new: true });
    if (!updatedTest) {
      return res.status(404).json({ message: 'Water quality test not found' });
    }
    res.status(200).json(updatedTest);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Validation error', errors: error.issues });
    }
    res.status(500).json({ message: 'Error updating water quality test', error });
  }
};

export const deleteWaterQualityTest = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedTest = await WaterQualityTest.findByIdAndDelete(id);
    if (!deletedTest) {
      return res.status(404).json({ message: 'Water quality test not found' });
    }
    res.status(200).json({ message: 'Water quality test deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting water quality test', error });
  }
};