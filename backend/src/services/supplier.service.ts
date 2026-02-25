import { Supplier } from "../models/supplier.model.js";
import type { ISupplier } from "../types/supplier.type.js";

export const createSupplier = async (data: Partial<ISupplier>) => {
  return await Supplier.create(data);
};

export const getAllSuppliers = async () => {
  return await Supplier.find().populate("productsSupplied");
};

export const getSupplierById = async (id: string) => {
  return await Supplier.findById(id).populate("productsSupplied");
};

export const updateSupplier = async (
  id: string,
  data: Partial<ISupplier>
) => {
  return await Supplier.findByIdAndUpdate(id, data, { new: true });
};

export const deleteSupplier = async (id: string) => {
  return await Supplier.findByIdAndDelete(id);
};