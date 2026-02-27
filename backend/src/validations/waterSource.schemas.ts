import { z } from 'zod';

export const createWaterSourceSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.enum(['well', 'tap', 'borehole']),
  location: z.string().min(1, 'Location is required'),
  capacity: z.number().min(0, 'Capacity must be non-negative'),
  condition: z.enum(['Good', 'Fair', 'Poor']).default('Good'),
  isActive: z.boolean().default(true),
  notes: z.string().optional()
});

export const updateWaterSourceSchema = z.object({
  name: z.string().min(1).optional(),
  type: z.enum(['well', 'tap', 'borehole']).optional(),
  location: z.string().min(1).optional(),
  capacity: z.number().min(0).optional(),
  condition: z.enum(['Good', 'Fair', 'Poor']).optional(),
  isActive: z.boolean().optional(),
  notes: z.string().optional()
});

export type CreateWaterSourceData = z.infer<typeof createWaterSourceSchema>;
export type UpdateWaterSourceData = z.infer<typeof updateWaterSourceSchema>;
