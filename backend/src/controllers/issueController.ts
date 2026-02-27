import type { Request, Response, NextFunction } from 'express';
import {
  createNewIssue,
  getAllIssuesService,
  getIssueByIdService,
  updateIssueService,
  deleteIssueService
} from '../services/issueService.js';
import { createIssueSchema, updateIssueSchema } from '../validations/issue.validation.js';
import type { IssueFilters, IssueStatus, IssuePriority, IssueType } from '../types/issueSchemas.js';
import { HTTP_STATUS } from '../constants/index.js';

// POST /api/issues — Submit a new issue report
export const createIssueController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = createIssueSchema.parse(req.body);
    const issue = await createNewIssue(validatedData, req.user.userId);
    res.status(HTTP_STATUS.CREATED).json(issue);
  } catch (error) {
    next(error);
  }
};

// GET /api/issues — Retrieve all issues (with optional filters)
export const getIssuesController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filters: IssueFilters = {};
    if (req.query.status)    filters.status    = req.query.status    as IssueStatus;
    if (req.query.priority)  filters.priority  = req.query.priority  as IssuePriority;
    if (req.query.issueType) filters.issueType = req.query.issueType as IssueType;

    const issues = await getAllIssuesService(filters);
    res.json(issues);
  } catch (error) {
    next(error);
  }
};

// GET /api/issues/:id — Retrieve a specific issue
export const getIssueByIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const issue = await getIssueByIdService(req.params.id as string);
    res.json(issue);
  } catch (error) {
    next(error);
  }
};

// PUT /api/issues/:id — Update status, assignment, or resolution notes
export const updateIssueController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = updateIssueSchema.parse(req.body);
    const issue = await updateIssueService(req.params.id as string, validatedData);
    res.json(issue);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/issues/:id — Remove a duplicate or invalid issue report
export const deleteIssueController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteIssueService(req.params.id as string);
    res.status(HTTP_STATUS.OK).json({ message: 'Issue deleted successfully' });
  } catch (error) {
    next(error);
  }
};