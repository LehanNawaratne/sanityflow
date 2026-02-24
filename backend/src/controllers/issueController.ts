import type { Request, Response, NextFunction } from 'express';
import Issue from '../models/Issue.js';
import { createIssueSchema, updateIssueStatusSchema } from '../types/issueSchemas.js';
import { HTTP_STATUS } from '../constants/index.js';

// Create a new issue
export const createIssue = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate input
    const validatedData = createIssueSchema.parse(req.body);

    // Create issue
    const issue = new Issue({
      ...validatedData,
      reporter: (req as any).userId
    });

    await issue.save();
    res.status(HTTP_STATUS.CREATED).json(issue);
  } catch (error) {
    next(error);
  }
};

// Get all issues
export const getIssues = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const issues = await Issue.find().populate('reporter', 'name email');
    res.json(issues);
  } catch (error) {
    next(error);
  }
};

// Update issue status
export const updateIssueStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const validatedData = updateIssueStatusSchema.parse(req.body);

    const issue = await Issue.findByIdAndUpdate(id, validatedData, { new: true });
    if (!issue) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Issue not found' });
    }

    res.json(issue);
  } catch (error) {
    next(error);
  }
};