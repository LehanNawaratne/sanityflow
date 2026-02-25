import { z } from 'zod';

// Schema for creating a new issue
export const createIssueSchema = z.object({
  type: z.string().min(1, 'Issue type is required'),
  description: z.string().min(1, 'Description is required'),
  location: z.string().min(1, 'Location is required'),
  coordinates: z.object({
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180)
  }).optional(),
  photo: z.string().url().optional(),
  priority: z.enum(['Low', 'Medium', 'High']).default('Medium'),
  area: z.string().min(1, 'Area is required')
});

// Schema for updating issue status
export const updateIssueStatusSchema = z.object({
  status: z.enum(['Pending', 'In Progress', 'Resolved'])
});

export type UpdateIssueStatusData = z.infer<typeof updateIssueStatusSchema>;
export type CreateIssueData = z.infer<typeof createIssueSchema>;
export type UpdateIssueData = z.infer<typeof updateIssueSchema>;

// Schema for updating issue with assignment and resolution
export const updateIssueSchema = z.object({
  type: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  coordinates: z.object({
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180)
  }).optional(),
  photo: z.string().url().optional(),
  priority: z.enum(['Low', 'Medium', 'High']).optional(),
  area: z.string().optional(),
  status: z.enum(['Pending', 'In Progress', 'Resolved']).optional(),
  assignedTo: z.string().optional(),
  resolutionNotes: z.string().optional()
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