import {z} from "zod";

export const createResourceSchema = z.object ({

name: z.string().min(2),
category: z.string().min(2),
quantity: z.number().min(0),
unit: z.string(),
reorderLevel: z.number().min(0).optional(),
supplier: z.string().regex(/^[0-9a-fA-F]{24}$/),
barcode: z.string().optional(),
isActive: z.boolean().optional() 

})