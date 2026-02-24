import { z } from 'zod';

// Schema for creating a new issue
export const createIssueSchema = z.object({
  description: z.string().min(1, 'Description is required'),
  location: z.string().min(1, 'Location is required')
});

// Schema for updating issue status
export const updateIssueStatusSchema = z.object({
  status: z.enum(['Pending', 'In Progress', 'Resolved'])
});

// Schema for creating a new water quality test
export const createWaterTestSchema = z.object({
  location: z.string().min(1, 'Location is required'),
  pH: z.number().min(0).max(14),
  tds: z.number().min(0),
  contaminants: z.array(z.string()),
  status: z.enum(['Safe', 'Unsafe']),
  notes: z.string().optional()
});

// Schema for updating a water quality test
export const updateWaterTestSchema = z.object({
  pH: z.number().min(0).max(14).optional(),
  tds: z.number().min(0).optional(),
  contaminants: z.array(z.string()).optional(),
  status: z.enum(['Safe', 'Unsafe']).optional(),
  notes: z.string().optional()
});