import { z } from "zod";

export const createSupplierSchema = z.object({
  name: z.string().min(2),
  contact: z.object({
    email: z.string().email().optional(),
    phone: z.string().optional(),
    address: z.string().optional()
  }),
  productsSupplied: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/) ).optional(),
  reliabilityRating: z.number().min(1).max(5).optional()
});