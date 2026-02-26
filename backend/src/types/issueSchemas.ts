import { z } from 'zod';
import { updateIssueStatusSchema } from '../validations/issue.validation.js';

export type UpdateIssueStatusData = z.infer<typeof updateIssueStatusSchema>;

export type CreateIssueData = {
  description: string;
  location: string;
};

export type IssueStatus = 'Pending' | 'In Progress' | 'Resolved';