import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import {
  createIssueController,
  getIssuesController,
  getIssueByIdController,
  updateIssueController,
  deleteIssueController,
} from '../issue.controller.js';
import {
  createNewIssue,
  getAllIssuesService,
  getIssueByIdService,
  updateIssueService,
  deleteIssueService,
} from '../../services/issue.service.js';
import { createIssueSchema, updateIssueSchema } from '../../validations/issue.schema.js';

// Mock the service so we don't hit the real database
jest.mock('../../services/issue.service.js', () => ({
  createNewIssue: jest.fn(),
  getAllIssuesService: jest.fn(),
  getIssueByIdService: jest.fn(),
  updateIssueService: jest.fn(),
  deleteIssueService: jest.fn(),
}));

// Mock the validation schemas so we control what "parse" returns
jest.mock('../../validations/issue.schema.js', () => ({
  createIssueSchema: { parse: jest.fn() },
  updateIssueSchema: { parse: jest.fn() },
}));

// Helper to build a fake Express response object
const createMockRes = () => ({
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
  send: jest.fn(),
});

describe('issue.controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // --- createIssueController ---
  it('createIssueController should return 201 with the new issue', async () => {
    const req = { body: { title: 'Broken pipe' }, user: { userId: 'user-1' } } as any;
    const res = createMockRes();
    const next = jest.fn();

    const parsedBody = { title: 'Broken pipe', issueType: 'Infrastructure', priority: 'High' } as any;
    const createdIssue = { id: 'issue-1', ...parsedBody };

    (createIssueSchema.parse as jest.Mock).mockReturnValue(parsedBody);
    (createNewIssue as jest.MockedFunction<typeof createNewIssue>).mockResolvedValue(createdIssue as any);

    await createIssueController(req, res as any, next);

    expect(createIssueSchema.parse).toHaveBeenCalledWith(req.body);
    expect(createNewIssue).toHaveBeenCalledWith(parsedBody, 'user-1');
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(createdIssue);
  });

  // --- getIssuesController ---
  it('getIssuesController should return 200 with all issues', async () => {
    const req = { query: { status: 'Pending', priority: 'High' } } as any;
    const res = createMockRes();
    const next = jest.fn();

    const issues = [{ id: 'issue-1' }, { id: 'issue-2' }];
    (getAllIssuesService as jest.MockedFunction<typeof getAllIssuesService>).mockResolvedValue(issues as any);

    await getIssuesController(req, res as any, next);

    expect(getAllIssuesService).toHaveBeenCalledWith({ status: 'Pending', priority: 'High' });
    expect(res.json).toHaveBeenCalledWith(issues);
  });

  it('getIssuesController should pass empty filters when no query params', async () => {
    const req = { query: {} } as any;
    const res = createMockRes();
    const next = jest.fn();

    (getAllIssuesService as jest.MockedFunction<typeof getAllIssuesService>).mockResolvedValue([] as any);

    await getIssuesController(req, res as any, next);

    expect(getAllIssuesService).toHaveBeenCalledWith({});
  });

  // --- getIssueByIdController ---
  it('getIssueByIdController should return 200 with the issue', async () => {
    const req = { params: { id: 'issue-1' } } as any;
    const res = createMockRes();
    const next = jest.fn();

    const issue = { id: 'issue-1', title: 'Flood' };
    (getIssueByIdService as jest.MockedFunction<typeof getIssueByIdService>).mockResolvedValue(issue as any);

    await getIssueByIdController(req, res as any, next);

    expect(getIssueByIdService).toHaveBeenCalledWith('issue-1');
    expect(res.json).toHaveBeenCalledWith(issue);
  });

  // --- updateIssueController ---
  it('updateIssueController should return 200 with the updated issue', async () => {
    const req = { params: { id: 'issue-1' }, body: { status: 'Resolved' } } as any;
    const res = createMockRes();
    const next = jest.fn();

    const parsedBody = { status: 'Resolved' as const };
    const updatedIssue = { id: 'issue-1', status: 'Resolved' };

    (updateIssueSchema.parse as jest.Mock).mockReturnValue(parsedBody);
    (updateIssueService as jest.MockedFunction<typeof updateIssueService>).mockResolvedValue(updatedIssue as any);

    await updateIssueController(req, res as any, next);

    expect(updateIssueSchema.parse).toHaveBeenCalledWith(req.body);
    expect(updateIssueService).toHaveBeenCalledWith('issue-1', parsedBody);
    expect(res.json).toHaveBeenCalledWith(updatedIssue);
  });

  // --- deleteIssueController ---
  it('deleteIssueController should return 200 with a success message', async () => {
    const req = { params: { id: 'issue-1' } } as any;
    const res = createMockRes();
    const next = jest.fn();

    (deleteIssueService as jest.MockedFunction<typeof deleteIssueService>).mockResolvedValue(undefined as any);

    await deleteIssueController(req, res as any, next);

    expect(deleteIssueService).toHaveBeenCalledWith('issue-1');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Issue deleted successfully' });
  });

  // --- error handling ---
  it('should call next(error) when service throws in getIssueByIdController', async () => {
    const req = { params: { id: 'bad-id' } } as any;
    const res = createMockRes();
    const next = jest.fn();
    const error = new Error('Not found');

    (getIssueByIdService as jest.MockedFunction<typeof getIssueByIdService>).mockRejectedValue(error);

    await getIssueByIdController(req, res as any, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
