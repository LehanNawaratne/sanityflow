import Driver from '../models/Driver.js';
import mongoose from 'mongoose';
import type { IDriver } from '../models/Driver.js';

export const createDriver = async (data: Partial<IDriver>) => {
  return await Driver.create(data);
};

export const getAllDrivers = async (filters?: { availability?: 'Active' | 'Inactive' }) => {
  const query: any = {};
  if (filters?.availability) query.availability = filters.availability;
  return await Driver.find(query).sort({ createdAt: -1 });
};

export const getDriverById = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid driver ID');
  }
  const driver = await Driver.findById(id);
  if (!driver) {
    throw new Error('Driver not found');
  }
  return driver;
};

export const updateDriver = async (id: string, data: Partial<IDriver>) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid driver ID');
  }
  const driver = await Driver.findByIdAndUpdate(
    id,
    data,
    { new: true, runValidators: true }
  );
  if (!driver) {
    throw new Error('Driver not found');
  }
  return driver;
};

export const deleteDriver = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid driver ID');
  }
  const driver = await Driver.findByIdAndDelete(id);
  if (!driver) {
    throw new Error('Driver not found');
  }
  return driver;
};
