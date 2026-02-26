import { InventoryTransaction } from "../models/inventoryTransaction.model.js";
import type { IInventoryTransaction } from "../types/inventoryTransaction.type.js";

export const createTransaction = async (
  data: Partial<IInventoryTransaction>
) => {
  return await InventoryTransaction.create(data);
};

export const getAllTransactions = async () => {
  return await InventoryTransaction.find()
    .populate("product")
    .populate("user");
};

export const getTransactionById = async (id: string) => {
  return await InventoryTransaction.findById(id)
    .populate("product")
    .populate("user");
};