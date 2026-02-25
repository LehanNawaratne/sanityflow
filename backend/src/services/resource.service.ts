import { Resource } from "../models/resource.model.js";
import type { IResource } from "../types/resource.type.js";

export const createResource = async (data: Partial<IResource>) => {
  return await Resource.create(data);
};

export const getAllResources = async () => {
  return await Resource.find().populate("supplier");
};

export const getResourceById = async (id: string) => {
  return await Resource.findById(id).populate("supplier");
};

export const updateResource = async (
  id: string,
  data: Partial<IResource>
) => {
  return await Resource.findByIdAndUpdate(id, data, { new: true });
};

export const deleteResource = async (id: string) => {
  return await Resource.findByIdAndDelete(id);
};