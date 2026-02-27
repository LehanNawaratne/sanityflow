import Driver from '../models/Driver.js';
import User from '../models/User.js';
import mongoose from 'mongoose';
import type { IDriver } from '../models/Driver.js';
import { AppError } from '../utils/errorHandler.js';

export const createDriver = async (data: Partial<IDriver> & { password: string }) => {
  const { password, ...profileData } = data;

  const existingUser = await User.findOne({ email: profileData.email });
  if (existingUser) throw new AppError(409, 'Email already in use');

  // Create the User account with driver role so they can log in via /auth/login
  const user = await User.create({
    name: profileData.name,
    email: profileData.email,
    password,
    role: 'driver',
  });

  try {
    const driver = await Driver.create({ ...profileData, userId: user._id });
    return driver;
  } catch (err) {
    // Roll back user creation if driver profile fails
    await User.findByIdAndDelete(user._id);
    throw err;
  }
};

export const getAllDrivers = async (filters?: { availability?: 'Active' | 'Inactive' }) => {
  const query: any = {};
  if (filters?.availability) query.availability = filters.availability;
  return await Driver.find(query).sort({ createdAt: -1 });
};

export const getDriverById = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(400, 'Invalid driver ID');
  }
  const driver = await Driver.findById(id);
  if (!driver) {
    throw new AppError(404, 'Driver not found');
  }
  return driver;
};

export const updateDriver = async (id: string, data: Partial<IDriver>) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(400, 'Invalid driver ID');
  }
  const driver = await Driver.findByIdAndUpdate(
    id,
    data,
    { new: true, runValidators: true }
  );
  if (!driver) {
    throw new AppError(404, 'Driver not found');
  }
  return driver;
};

export const deleteDriver = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(400, 'Invalid driver ID');
  }
  const driver = await Driver.findByIdAndDelete(id);
  if (!driver) {
    throw new AppError(404, 'Driver not found');
  }
  return driver;
};
