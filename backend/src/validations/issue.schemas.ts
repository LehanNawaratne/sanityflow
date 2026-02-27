import { z } from 'zod';
import { createIssueSchema, updateIssueSchema } from './issue.schema.js';

export type IssueType = 'Water Quality' | 'Water Shortage' | 'Infrastructure' | 'Other';
export type IssuePriority = 'Low' | 'Medium' | 'High';
export type IssueStatus = 'Pending' | 'In Progress' | 'Resolved';

export type CreateIssueData = z.infer<typeof createIssueSchema>;
export type UpdateIssueData = z.infer<typeof updateIssueSchema>;

export type IssueFilters = {
  status?: IssueStatus;
  priority?: IssuePriority;
  issueType?: IssueType;
};