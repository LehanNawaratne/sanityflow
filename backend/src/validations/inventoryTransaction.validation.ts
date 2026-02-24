import { z } from "zod";

export const createInventoryTransactionSchema = z.object({
  product: z.string().regex(/^[0-9a-fA-F]{24}$/),
  type: z.enum(["ADD", "REMOVE", "TRANSFER"]),
  quantity: z.number().min(1),
  user: z.string().regex(/^[0-9a-fA-F]{24}$/),
  reason: z.string().min(3)
});