import { z } from "zod";

export const barcodeSchema = z.object({
  barcode: z.string().min(8).max(20),
});