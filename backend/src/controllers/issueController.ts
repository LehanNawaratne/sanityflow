import type { Request, Response, NextFunction } from 'express';
import { createNewIssue, getAllIssuesService, updateIssueStatusService } from '../services/issueService.js';
import { createIssueSchema, updateIssueStatusSchema } from '../validations/issue.validation.js';
import type { UpdateIssueStatusData } from '../types/issueSchemas.js';
import { HTTP_STATUS } from '../constants/index.js';

// Create a new issue
export const createIssueController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate input
    const validatedData = createIssueSchema.parse(req.body);

    // Call service for business logic
    const issue = await createNewIssue(validatedData, (req as any).userId);

    res.status(HTTP_STATUS.CREATED).json(issue);
  } catch (error) {
    next(error);
  }
};

// Get all issues
export const getIssuesController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const issues = await getAllIssuesService();
    res.json(issues);
  } catch (error) {
    next(error);
  }
};

// Update issue status
export const updateIssueStatusController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const parseResult = updateIssueStatusSchema.safeParse(req.body);
    
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const issue = await updateIssueStatusService(id, parseResult.data.status as 'Pending' | 'In Progress' | 'Resolved');

    res.json(issue);
  } catch (error) {
    next(error);
  }
};