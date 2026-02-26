import Issue from '../models/Issue.js';
import type { IIssue } from '../models/Issue.js';
import type { CreateIssueData, UpdateIssueData, IssueFilters } from '../types/issueSchemas.js';

const notFound = () => Object.assign(new Error('Issue not found'), { status: 404 });

export const createNewIssue = async (data: CreateIssueData, userId: string): Promise<IIssue> => {
  const issue = new Issue({
    ...data,
    reporter: userId,
    status: 'Pending'
  });
  return await issue.save();
};

export const getAllIssuesService = async (filters: IssueFilters): Promise<IIssue[]> => {
  const query: Record<string, unknown> = {};

  if (filters.status)   query.status    = filters.status;
  if (filters.priority) query.priority  = filters.priority;
  if (filters.issueType) query.issueType = filters.issueType;

  return await Issue.find(query)
    .populate('reporter', 'name email')
    .populate('assignedTo', 'name email')
    .sort({ createdAt: -1 });
};

export const getIssueByIdService = async (id: string): Promise<IIssue> => {
  const issue = await Issue.findById(id)
    .populate('reporter', 'name email')
    .populate('assignedTo', 'name email');

  if (!issue) throw notFound();
  return issue;
};

export const updateIssueService = async (id: string, data: UpdateIssueData): Promise<IIssue> => {
  const issue = await Issue.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true, runValidators: true }
  ).populate('reporter', 'name email').populate('assignedTo', 'name email');

  if (!issue) throw notFound();
  return issue;
};

export const deleteIssueService = async (id: string): Promise<void> => {
  const issue = await Issue.findByIdAndDelete(id);
  if (!issue) throw notFound();
};