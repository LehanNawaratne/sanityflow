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
