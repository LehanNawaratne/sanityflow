import type { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../constants/index.js";
import { barcodeSchema } from "../validations/barcode.schema.js";
import { lookupBarcodeService } from "../services/barcode.service.js";

export const lookupBarcodeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parsed = barcodeSchema.parse(req.params);

    const product = await lookupBarcodeService(parsed.barcode);

    if (!product) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ error: "Product not found in external database" });
    }

    res.status(HTTP_STATUS.OK).json(product);
  } catch (error) {
    next(error);
  }
};