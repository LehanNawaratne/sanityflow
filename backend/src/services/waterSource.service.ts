import WaterSource from '../models/WaterSource.js';
import type { IWaterSource } from '../models/WaterSource.js';
import { createWaterSourceSchema, updateWaterSourceSchema } from '../types/waterSourceSchemas.js';
import type { CreateWaterSourceData, UpdateWaterSourceData } from '../types/waterSourceSchemas.js';
import { AppError } from '../utils/errorHandler.js';

// ──────────────────────────────────────────────
// Create a new water source
// Business rules:
//   1. Validate input with Zod schema
//   2. Reject duplicate source (same name + location)
// ──────────────────────────────────────────────
export const createWaterSourceService = async (
  rawData: unknown
): Promise<IWaterSource> => {
  // 1. Validate & sanitise input
  const data: CreateWaterSourceData = createWaterSourceSchema.parse(rawData);

  // 2. Business rule: prevent duplicate water sources
  const duplicate = await WaterSource.findOne({
    name: data.name,
    location: data.location
  });
  if (duplicate) {
    throw new AppError(409, `A water source named "${data.name}" already exists at "${data.location}"`);
  }

  const source = new WaterSource(data);
  return await source.save();
};

// ──────────────────────────────────────────────
// Retrieve all water sources
// Business rules:
//   1. Support optional filters: condition, type, isActive
//   2. Default: return all sources sorted by newest first
// ──────────────────────────────────────────────
export const getAllWaterSourcesService = async (
  filters: { condition?: string; type?: string; isActive?: string } = {}
): Promise<IWaterSource[]> => {
  const query: Record<string, unknown> = {};

  if (filters.condition) query.condition = filters.condition;
  if (filters.type) query.type = filters.type;
  if (filters.isActive !== undefined) {
    query.isActive = filters.isActive === 'true';
  }

  return await WaterSource.find(query).sort({ createdAt: -1 });
};

// ──────────────────────────────────────────────
// Retrieve a single water source by ID
// ──────────────────────────────────────────────
export const getWaterSourceByIdService = async (id: string): Promise<IWaterSource> => {
  const source = await WaterSource.findById(id);
  if (!source) {
    throw new AppError(404, 'Water source not found');
  }
  return source;
};

// ──────────────────────────────────────────────
// Update a water source
// Business rules:
//   1. Validate input with Zod schema
//   2. If condition is set to 'Poor' and no note is provided,
//      auto-append an inspection warning note
// ──────────────────────────────────────────────
export const updateWaterSourceService = async (
  id: string,
  rawData: unknown
): Promise<IWaterSource> => {
  // 1. Validate & sanitise input
  const data: UpdateWaterSourceData = updateWaterSourceSchema.parse(rawData);

  // 2. Business rule: auto-note on 'Poor' condition if none supplied
  if (data.condition === 'Poor' && !data.notes) {
    data.notes = 'Condition flagged as Poor — inspection and maintenance required.';
  }

  const source = await WaterSource.findByIdAndUpdate(
    id,
    data,
    { new: true, runValidators: true }
  );
  if (!source) {
    throw new AppError(404, 'Water source not found');
  }
  return source;
};

// ──────────────────────────────────────────────
// Delete a water source
// ──────────────────────────────────────────────
export const deleteWaterSourceService = async (id: string): Promise<void> => {
  const source = await WaterSource.findByIdAndDelete(id);
  if (!source) {
    throw new AppError(404, 'Water source not found');
  }
};
