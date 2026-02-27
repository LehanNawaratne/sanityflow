import type { Request, Response, NextFunction } from 'express';
import {
  createNewIssue,
  getAllIssuesService,
  getIssueByIdService,
  updateIssueService,
  deleteIssueService
} from '../services/issue.service.js';
import { createIssueSchema, updateIssueSchema } from '../validations/issue.schema.js';
import type { IssueFilters, IssueStatus, IssuePriority, IssueType } from '../validations/issue.schemas.js';
import { HTTP_STATUS } from '../constants/index.js';

export const createIssueController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = createIssueSchema.parse(req.body);
    const issue = await createNewIssue(validatedData, req.user.userId);
    res.status(HTTP_STATUS.CREATED).json(issue);
  } catch (error) {
    next(error);
  }
};

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

export const getIssueByIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const issue = await getIssueByIdService(req.params.id as string);
    res.json(issue);
  } catch (error) {
    next(error);
  }
};

export const updateIssueController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = updateIssueSchema.parse(req.body);
    const issue = await updateIssueService(req.params.id as string, validatedData);
    res.json(issue);
  } catch (error) {
    next(error);
  }
};

export const deleteIssueController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteIssueService(req.params.id as string);
    res.status(HTTP_STATUS.OK).json({ message: 'Issue deleted successfully' });
  } catch (error) {
    next(error);
  }
};