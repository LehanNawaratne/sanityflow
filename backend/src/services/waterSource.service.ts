import WaterSource from '../models/WaterSource.js';
import type { IWaterSource } from '../models/WaterSource.js';
import { createWaterSourceSchema, updateWaterSourceSchema } from '../validations/waterSource.schemas.js';
import type { CreateWaterSourceData, UpdateWaterSourceData } from '../validations/waterSource.schemas.js';
import { AppError } from '../utils/errorHandler.js';
import { fetchWeatherForLocation, type WeatherData } from './weather.service.js';

export interface WaterSourceWithWeather {
  source: IWaterSource;
  weather: WeatherData | null;
}

export const createWaterSourceService = async (
  rawData: unknown
): Promise<IWaterSource> => {
  const data: CreateWaterSourceData = createWaterSourceSchema.parse(rawData);

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

export const getWaterSourceByIdService = async (id: string): Promise<WaterSourceWithWeather> => {
  const source = await WaterSource.findById(id);
  if (!source) {
    throw new AppError(404, 'Water source not found');
  }
  const weather = await fetchWeatherForLocation(source.location);
  return { source, weather };
};

export const updateWaterSourceService = async (
  id: string,
  rawData: unknown
): Promise<IWaterSource> => {
  const data: UpdateWaterSourceData = updateWaterSourceSchema.parse(rawData);

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

export const deleteWaterSourceService = async (id: string): Promise<void> => {
  const source = await WaterSource.findByIdAndDelete(id);
  if (!source) {
    throw new AppError(404, 'Water source not found');
  }
};
