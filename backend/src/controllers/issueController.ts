import type { Request, Response, NextFunction } from 'express';
import { 
  createNewIssue, 
  getAllIssuesService, 
  updateIssueStatusService,
  updateIssueService,
  getIssueByIdService,
  deleteIssueService
} from '../services/issueService.js';
import { 
  createIssueSchema, 
  updateIssueStatusSchema, 
  updateIssueSchema,
  type UpdateIssueStatusData 
} from '../types/issueSchemas.js';
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
    const filters = {
      type: req.query.type as string,
      priority: req.query.priority as string,
      status: req.query.status as string,
      area: req.query.area as string,
      assignedTo: req.query.assignedTo as string
    };
    
    // Remove undefined values
    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value)
    );
    
    const issues = await getAllIssuesService(cleanFilters);
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

// Get specific issue by ID
export const getIssueByIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const issue = await getIssueByIdService(id);
    res.json(issue);
  } catch (error) {
    next(error);
  }
};

// Update full issue details
export const updateIssueController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const validatedData = updateIssueSchema.parse(req.body);

    const issue = await updateIssueService(id, validatedData);
    res.json(issue);
  } catch (error) {
    next(error);
  }
};

// Delete issue
export const deleteIssueController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    await deleteIssueService(id);
    res.json({ message: 'Issue deleted successfully' });
  } catch (error) {
    next(error);
  }
};