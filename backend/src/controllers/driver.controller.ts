import type { Request, Response } from 'express';
import { createDriverSchema, updateDriverSchema } from '../validations/driver.schemas.js';
import { createDriver, getAllDrivers, getDriverById, updateDriver, deleteDriver } from '../services/driver.service.js';

export const createDriverController = async (req: Request, res: Response) => {
  try {
    const parsed = createDriverSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.issues });
    }
    const driver = await createDriver(parsed.data);
    res.status(201).json(driver);
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: errMsg });
  }
};

export const getAllDriversController = async (req: Request, res: Response) => {
  try {
    const { availability } = req.query;
    const drivers = await getAllDrivers(
      availability ? { availability: availability as 'Active' | 'Inactive' } : undefined
    );
    res.status(200).json(drivers);
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: errMsg });
  }
};

export const getDriverByIdController = async (req: Request, res: Response) => {
  try {
    const id = typeof req.params.id === 'string' ? req.params.id : Array.isArray(req.params.id) ? req.params.id[0] : '';
    if (!id) return res.status(400).json({ error: 'Invalid driver ID' });
    const driver = await getDriverById(id);
    res.status(200).json(driver);
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    res.status(404).json({ error: errMsg });
  }
};

export const updateDriverController = async (req: Request, res: Response) => {
  try {
    const id = typeof req.params.id === 'string' ? req.params.id : Array.isArray(req.params.id) ? req.params.id[0] : '';
    if (!id) return res.status(400).json({ error: 'Invalid driver ID' });
    const parsed = updateDriverSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.issues });
    }

    // updated the parse error
    const updateData = Object.fromEntries(
      Object.entries(parsed.data).filter(([_, v]) => v !== undefined)
    );
    const driver = await updateDriver(id, updateData);
    res.status(200).json(driver);
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    res.status(404).json({ error: errMsg });
  }
};

export const deleteDriverController = async (req: Request, res: Response) => {
  try {
    const id = typeof req.params.id === 'string' ? req.params.id : Array.isArray(req.params.id) ? req.params.id[0] : '';
    if (!id) return res.status(400).json({ error: 'Invalid driver ID' });
    const driver = await deleteDriver(id);
    res.status(200).json({ message: 'Driver deleted', driver });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    res.status(404).json({ error: errMsg });
  }
};
