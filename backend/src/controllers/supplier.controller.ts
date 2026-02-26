import type { Request, Response } from "express";
import * as supplierService from "../services/supplier.service.js";
import { HTTP_STATUS } from "../constants/index.js";

export const createSupplier = async (req: Request, res: Response) => {
  const supplier = await supplierService.createSupplier(req.body);
  res.status(HTTP_STATUS.CREATED).json(supplier);
};

export const getAllSuppliers = async (_req: Request, res: Response) => {
  const suppliers = await supplierService.getAllSuppliers();
  res.status(HTTP_STATUS.OK).json(suppliers);
};

export const getSupplierById = async (req: Request, res: Response) => {

    const {id} = req.params;

    if (!id || typeof id !== "string") {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ error: "Invalid resource ID" });
  }
  const supplier = await supplierService.getSupplierById(id);

  if (!supplier)
    return res
      .status(HTTP_STATUS.NOT_FOUND)
      .json({ error: "Supplier not found" });

  res.status(HTTP_STATUS.OK).json(supplier);
};

export const updateSupplier = async (req: Request, res: Response) => {

    const {id} = req.params;

    if (!id || typeof id !== "string") {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ error: "Invalid resource ID" });
  }

  const updated = await supplierService.updateSupplier(id , req.body);

  if (!updated)
    return res
      .status(HTTP_STATUS.NOT_FOUND)
      .json({ error: "Supplier not found" });

  res.status(HTTP_STATUS.OK).json(updated);
};

export const deleteSupplier = async (req: Request, res: Response) => {

    const {id} = req.params;

    if (!id || typeof id !== "string") {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ error: "Invalid resource ID" });
  }

  await supplierService.deleteSupplier(id);
  res.status(HTTP_STATUS.NO_CONTENT).send();
};